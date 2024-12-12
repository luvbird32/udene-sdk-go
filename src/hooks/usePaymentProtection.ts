import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentProtectionService } from "@/services/paymentProtectionService";
import { Transaction } from "@/types/supabase";
import { useToast } from "@/components/ui/use-toast";

export const usePaymentProtection = (userId?: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const transactionHistory = useQuery({
    queryKey: ['transaction-history', userId],
    queryFn: () => userId ? paymentProtectionService.getTransactionHistory(userId) : null,
    enabled: !!userId,
  });

  const assessTransaction = useMutation({
    mutationFn: (transactionData: Partial<Transaction>) => 
      paymentProtectionService.assessTransaction(transactionData),
    onSuccess: (data) => {
      if (data.recommendation === 'block') {
        toast({
          title: "High Risk Transaction Detected",
          description: "This transaction has been flagged as potentially fraudulent.",
          variant: "destructive",
        });
      } else if (data.verificationRequired) {
        toast({
          title: "Verification Required",
          description: "Additional verification is needed for this transaction.",
        });
      }
      queryClient.invalidateQueries({ queryKey: ['transaction-history'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to assess transaction risk. Please try again.",
        variant: "destructive",
      });
    },
  });

  const logVerification = useMutation({
    mutationFn: ({ transactionId, verificationData }: { transactionId: string, verificationData: any }) =>
      paymentProtectionService.logVerificationAttempt(transactionId, verificationData),
  });

  return {
    transactionHistory: transactionHistory.data ?? [],
    isLoading: transactionHistory.isLoading,
    error: transactionHistory.error,
    assessTransaction: assessTransaction.mutate,
    isAssessing: assessTransaction.isPending,
    logVerification: logVerification.mutate,
  };
};