import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useMetricsData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error("No user found");
        }

        // Fetch metrics from client_metrics table instead of metrics
        const { data: metricsData, error } = await supabase
          .from('client_metrics')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false })
          .limit(1);

        if (error) {
          console.error("Error fetching client metrics:", error);
          throw error;
        }

        // If no metrics exist yet, return default values
        if (!metricsData || metricsData.length === 0) {
          return {
            riskScore: 0,
            totalTransactions: 0,
            flaggedTransactions: 0
          };
        }

        // Map the client metrics to the expected format
        return {
          riskScore: metricsData[0].metric_value || 0,
          totalTransactions: metricsData.find(m => m.metric_name === 'total_transactions')?.metric_value || 0,
          flaggedTransactions: metricsData.find(m => m.metric_name === 'flagged_transactions')?.metric_value || 0
        };
      } catch (error) {
        console.error("Client metrics fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load metrics data. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};