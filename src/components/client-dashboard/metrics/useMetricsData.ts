import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useMetricsData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["client-metrics"],
    queryFn: async () => {
      try {
        // First check if we have a valid session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.error("No active session");
          throw new Error("Authentication required");
        }

        console.log("Fetching metrics data...");
        const { data: metrics, error: metricsError } = await supabase
          .from('metrics')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(1);

        if (metricsError) {
          console.error("Error fetching metrics:", metricsError);
          throw metricsError;
        }

        if (!metrics || metrics.length === 0) {
          console.log("No metrics data found");
          return {
            riskScore: 0,
            totalTransactions: 0,
            flaggedTransactions: 0
          };
        }

        return {
          riskScore: metrics[0].metric_value || 0,
          totalTransactions: metrics[0].metric_value || 0,
          flaggedTransactions: 0
        };
      } catch (error) {
        console.error('Error in metrics query:', error);
        toast({
          title: "Error",
          description: "Failed to load metrics data. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorHandler: (error: Error) => {
        console.error("Failed to fetch metrics:", error);
        toast({
          title: "Error",
          description: "Failed to load metrics data",
          variant: "destructive",
        });
      },
    },
  });
};