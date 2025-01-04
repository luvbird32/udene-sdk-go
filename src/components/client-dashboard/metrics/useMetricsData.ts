import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ClientMetric {
  metric_name: string;
  metric_value: number;
}

export const useMetricsData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["client-dashboard-metrics"],
    queryFn: async () => {
      try {
        console.log("Fetching client metrics data...");
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error("No authenticated user found");
        }

        const { data, error } = await supabase
          .from('client_metrics')
          .select('metric_name, metric_value')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false });

        if (error) {
          console.error("Error fetching client metrics:", error);
          throw error;
        }

        if (!data || data.length === 0) {
          console.log("No metrics found for user");
          return {
            riskScore: 0,
            totalTransactions: 0,
            flaggedTransactions: 0
          };
        }

        // Map the metrics to our expected format
        const metrics = data.reduce((acc: Record<string, number>, curr: ClientMetric) => {
          acc[curr.metric_name] = curr.metric_value;
          return acc;
        }, {});

        return {
          riskScore: metrics.risk_score || 0,
          totalTransactions: metrics.total_transactions || 0,
          flaggedTransactions: metrics.flagged_transactions || 0
        };
      } catch (error) {
        console.error("Failed to fetch client metrics:", error);
        toast({
          title: "Error",
          description: "Failed to load metrics data. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    refetchInterval: 30000,
  });
};