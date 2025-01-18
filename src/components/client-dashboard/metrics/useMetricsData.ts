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
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching metrics:", error);
        throw error;
      }

      return {
        riskScore: data?.metric_value,
        totalTransactions: data?.total_transactions,
        flaggedTransactions: data?.flagged_transactions,
        avgProcessingTime: data?.avg_processing_time,
        concurrentCalls: data?.concurrent_calls,
        activeUsers: data?.active_users
      };
    },
    refetchInterval: 30000,
  });
};