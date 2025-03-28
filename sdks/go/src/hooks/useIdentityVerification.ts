import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { identityVerificationService } from "@/services/identityVerificationService";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const useIdentityVerification = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  const { data: verifications, isLoading: isLoadingVerifications } = useQuery({
    queryKey: ["identity-verifications", currentUser?.id],
    queryFn: () => currentUser?.id ? identityVerificationService.getVerifications(currentUser.id) : null,
    enabled: !!currentUser?.id,
  });

  const createVerification = useMutation({
    mutationFn: identityVerificationService.createVerification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identity-verifications"] });
      toast({
        title: "Verification initiated",
        description: "Your identity verification request has been submitted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to initiate verification. Please try again.",
        variant: "destructive",
      });
      console.error("Verification creation error:", error);
    },
  });

  const updateVerification = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      identityVerificationService.updateVerification(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identity-verifications"] });
      toast({
        title: "Verification updated",
        description: "The verification status has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update verification. Please try again.",
        variant: "destructive",
      });
      console.error("Verification update error:", error);
    },
  });

  return {
    verifications,
    isLoadingVerifications,
    createVerification,
    updateVerification,
  };
};