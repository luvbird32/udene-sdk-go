import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeviceFingerprint, getDeviceFingerprints, updateDeviceFingerprintRiskScore } from "@/services/deviceFingerprintService";
import { useToast } from "@/components/ui/use-toast";

export const useDeviceFingerprint = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: fingerprints, isLoading } = useQuery({
    queryKey: ["device-fingerprints"],
    queryFn: getDeviceFingerprints,
  });

  const createMutation = useMutation({
    mutationFn: createDeviceFingerprint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["device-fingerprints"] });
      toast({
        title: "Device fingerprint created",
        description: "New device fingerprint has been recorded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating device fingerprint",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  const updateRiskScoreMutation = useMutation({
    mutationFn: ({ id, risk_score, is_suspicious }: { id: string; risk_score: number; is_suspicious: boolean }) =>
      updateDeviceFingerprintRiskScore(id, risk_score, is_suspicious),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["device-fingerprints"] });
      toast({
        title: "Risk score updated",
        description: "Device fingerprint risk score has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating risk score",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  return {
    fingerprints,
    isLoading,
    createFingerprint: createMutation.mutate,
    updateRiskScore: updateRiskScoreMutation.mutate,
  };
};