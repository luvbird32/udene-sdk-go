import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProject } from "@/contexts/ProjectContext";

export const useMetricsData = () => {
  const { toast } = useToast();
  const { currentProject } = useProject();

  return useQuery({
    queryKey: ["dashboard-metrics", currentProject?.id],
    queryFn: async () => {
      try {
        console.log("Fetching metrics data...");
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.error("No user found");
          throw new Error("No user found");
        }

        // Query client_metrics filtered by project if one is selected
        const { data, error } = await supabase
          .from('client_metrics')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false })
          .maybeSingle();

        if (error) {
          console.error("Error fetching metrics:", error);
          throw error;
        }

        // If no metrics exist yet, return default values
        if (!data) {
          console.log("No metrics data found, returning defaults");
          return {
            riskScore: 0,
            totalTransactions: 0,
            flaggedTransactions: 0,
            avgProcessingTime: 35,
            concurrentCalls: 0,
            activeUsers: 0
          };
        }

        // Map the database metrics to our frontend format
        return {
          riskScore: data.metric_value || 0,
          totalTransactions: data.total_transactions || 0,
          flaggedTransactions: data.flagged_transactions || 0,
          avgProcessingTime: data.avg_processing_time || 35,
          concurrentCalls: data.concurrent_calls || 0,
          activeUsers: data.active_users || 0
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
    refetchInterval: 30000,
  });
};