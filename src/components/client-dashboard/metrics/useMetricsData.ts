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
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error("No user found");
        }

        // Query client_metrics filtered by project if one is selected
        const query = supabase
          .from('client_metrics')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false });

        // Add project filter if a project is selected
        if (currentProject?.id) {
          query.eq('project_id', currentProject.id);
        }

        const { data: metricsData, error } = await query.maybeSingle();

        if (error) {
          console.error("Error fetching metrics:", error);
          throw error;
        }

        // If no metrics exist yet, return default values
        if (!metricsData) {
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
          riskScore: metricsData.metric_value || 0,
          totalTransactions: metricsData.total_transactions || 0,
          flaggedTransactions: metricsData.flagged_transactions || 0,
          avgProcessingTime: metricsData.avg_processing_time || 35,
          concurrentCalls: metricsData.concurrent_calls || 0,
          activeUsers: metricsData.active_users || 0
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