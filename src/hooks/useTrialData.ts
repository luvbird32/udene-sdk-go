import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrialUsage, getTrialUsage, updateTrialStatus } from "@/services/trialService";
import { useToast } from "@/hooks/use-toast";

export const useTrialData = (userId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: trials, isLoading } = useQuery({
    queryKey: ["trial-usage", userId],
    queryFn: () => getTrialUsage(userId),
    enabled: !!userId,
  });

  const createTrialMutation = useMutation({
    mutationFn: ({ trialType }: { trialType: string }) => 
      createTrialUsage(userId, trialType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trial-usage", userId] });
      toast({
        title: "Trial Created",
        description: "Your trial has been successfully created.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to create trial. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ trialId, status }: { trialId: string; status: string }) =>
      updateTrialStatus(trialId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trial-usage", userId] });
      toast({
        title: "Status Updated",
        description: "Trial status has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to update trial status. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    trials,
    isLoading,
    createTrial: createTrialMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
  };
};