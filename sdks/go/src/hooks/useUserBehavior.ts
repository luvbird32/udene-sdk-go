import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserBehaviorMetrics } from "@/services/behaviorMetrics";
import { getBehaviorPatterns, logUserActivity } from "@/services/behaviorPatterns";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentUser } from "./useCurrentUser";

export const useUserBehavior = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  const { data: behaviorMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["user-behavior-metrics", currentUser?.id],
    queryFn: () => {
      if (!currentUser?.id) throw new Error("No user found");
      return getUserBehaviorMetrics(currentUser.id);
    },
    enabled: !!currentUser?.id,
  });

  const { data: behaviorPatterns, isLoading: patternsLoading } = useQuery({
    queryKey: ["user-behavior-patterns", currentUser?.id],
    queryFn: () => {
      if (!currentUser?.id) throw new Error("No user found");
      return getBehaviorPatterns(currentUser.id);
    },
    enabled: !!currentUser?.id,
  });

  const logActivity = useMutation({
    mutationFn: ({ 
      activityType, 
      metadata 
    }: { 
      activityType: string; 
      metadata: any; 
    }) => {
      if (!currentUser?.id) throw new Error("No user found");
      return logUserActivity(
        currentUser.id,
        activityType,
        metadata
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["user-behavior-patterns", currentUser?.id] 
      });
      toast({
        title: "Activity Logged",
        description: "User activity has been recorded successfully.",
      });
    },
    onError: (error) => {
      console.error("Error logging activity:", error);
      toast({
        title: "Error",
        description: "Failed to log user activity. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    behaviorMetrics,
    behaviorPatterns,
    isLoading: metricsLoading || patternsLoading,
    logActivity: logActivity.mutate,
  };
};