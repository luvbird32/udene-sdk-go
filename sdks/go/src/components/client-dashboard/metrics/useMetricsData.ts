import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface MetricsData {
  riskScore?: number;
  totalTransactions?: number;
  flaggedTransactions?: number;
  avgProcessingTime?: number;
  concurrentCalls?: number;
  activeUsers?: number;
}

export const useMetricsData = () => {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      console.log("Fetching metrics from Supabase...");
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching metrics:", error);
        throw error;
      }

      // Return default values if no metrics found
      return {
        riskScore: data?.metric_value ?? 0,
        totalTransactions: data?.total_transactions ?? 0,
        flaggedTransactions: data?.flagged_transactions ?? 0,
        avgProcessingTime: data?.avg_processing_time ?? 35,
        concurrentCalls: data?.concurrent_calls ?? 0,
        activeUsers: data?.active_users ?? 0
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};