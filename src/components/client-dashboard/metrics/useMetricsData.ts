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

        // Fetch metrics from Supabase
        const { data: metricsData, error } = await supabase
          .from('metrics')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(1);

        if (error) {
          console.error("Error fetching metrics:", error);
          throw error;
        }

        // If no metrics exist yet, return default values
        if (!metricsData || metricsData.length === 0) {
          return {
            riskScore: 0,
            totalTransactions: 0,
            flaggedTransactions: 0,
            avgProcessingTime: 0,
            concurrentCalls: 0,
            activeUsers: 0
          };
        }

        return {
          riskScore: metricsData[0].risk_score || 0,
          totalTransactions: metricsData[0].total_transactions || 0,
          flaggedTransactions: metricsData[0].flagged_transactions || 0,
          avgProcessingTime: metricsData[0].avg_processing_time || 0,
          concurrentCalls: metricsData[0].concurrent_calls || 0,
          activeUsers: metricsData[0].active_users || 0
        };
      } catch (error) {
        console.error("Metrics fetch error:", error);
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