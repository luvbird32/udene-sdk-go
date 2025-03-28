import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface MetricsData {
  riskScore?: number;
  totalTransactions?: number;
  flaggedTransactions?: number;
  avgProcessingTime?: number;
  concurrentCalls?: number;
  activeUsers?: number;
}

export const useMetricsData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      try {
        console.log("Checking Supabase session...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw new Error("Authentication error: " + sessionError.message);
        }

        if (!session) {
          console.error("No active session found");
          throw new Error("No active session");
        }

        console.log("Fetching metrics with session:", session.user.id);
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

        console.log("Metrics data received:", data);

        // Return default values if no metrics found
        return {
          riskScore: data?.metric_value ?? 0,
          totalTransactions: data?.total_transactions ?? 0,
          flaggedTransactions: data?.flagged_transactions ?? 0,
          avgProcessingTime: data?.avg_processing_time ?? 35,
          concurrentCalls: data?.concurrent_calls ?? 0,
          activeUsers: data?.active_users ?? 0
        };
      } catch (error) {
        console.error('Error in metrics query:', error);
        toast({
          variant: "destructive",
          title: "Error loading metrics",
          description: error instanceof Error ? error.message : "Failed to load dashboard metrics"
        });
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};