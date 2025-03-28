import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAffiliateActivity, getAffiliateActivities, getAffiliateMetrics } from "@/services/affiliateService";
import { useToast } from "@/components/ui/use-toast";

export const useAffiliateData = (affiliateId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['affiliate-activities', affiliateId],
    queryFn: () => getAffiliateActivities(affiliateId),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['affiliate-metrics', affiliateId],
    queryFn: () => getAffiliateMetrics(affiliateId),
    refetchInterval: 30000,
  });

  const createActivity = useMutation({
    mutationFn: createAffiliateActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['affiliate-activities'] });
      queryClient.invalidateQueries({ queryKey: ['affiliate-metrics'] });
      toast({
        title: "Activity Recorded",
        description: "The affiliate activity has been recorded and analyzed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to record activity: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    activities,
    metrics,
    createActivity,
    isLoading: activitiesLoading || metricsLoading,
  };
};