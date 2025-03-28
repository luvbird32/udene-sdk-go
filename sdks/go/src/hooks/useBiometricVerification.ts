import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useBiometricVerification = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: verifications, isLoading } = useQuery({
    queryKey: ['biometric-verifications'],
    queryFn: async () => {
      console.log("Fetching biometric verification data...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('biometric_verifications')
        .select(`
          *,
          device_fingerprints (
            fingerprint_hash,
            browser_info,
            risk_score
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching biometric data:", error);
        throw error;
      }

      return data;
    },
  });

  const recordVerification = useMutation({
    mutationFn: async (verificationData: {
      verification_type: 'fingerprint' | 'face' | 'voice' | 'iris';
      device_fingerprint: string;
      success: boolean;
      confidence_score: number;
      metadata?: Record<string, any>;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('biometric_verifications')
        .insert({
          user_id: user.id,
          ...verificationData
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['biometric-verifications'] });
      toast({
        title: "Verification recorded",
        description: "Biometric verification attempt has been logged successfully.",
      });
    },
    onError: (error) => {
      console.error("Error recording verification:", error);
      toast({
        title: "Error",
        description: "Failed to record biometric verification.",
        variant: "destructive",
      });
    },
  });

  return {
    verifications,
    isLoading,
    recordVerification,
  };
};