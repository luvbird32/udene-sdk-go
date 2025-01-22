import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BusinessMetrics } from "./types";

export const useBusinessMetrics = () => {
  const { toast } = useToast();

  return useQuery<BusinessMetrics>({
    queryKey: ["business-intelligence"],
    queryFn: async () => {
      console.log("Fetching business intelligence metrics...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user found");
        throw new Error("No user found");
      }

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select(`
          amount_encrypted,
          amount_iv,
          risk_score,
          is_fraudulent
        `)
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      if (!transactions) {
        console.log("No transactions found");
        return null;
      }

      console.log(`Processing ${transactions.length} transactions for metrics`);

      // Process transactions with decrypted amounts
      const processedTransactions = await Promise.all(
        transactions.map(async (tx) => {
          let amount = 0;
          if (tx.amount_encrypted && tx.amount_iv) {
            try {
              const { data: decryptedAmount, error: decryptError } = await supabase.rpc(
                'decrypt_sensitive_data',
                {
                  encrypted_data: tx.amount_encrypted,
                  iv: tx.amount_iv
                }
              );
              if (!decryptError) {
                amount = Number(decryptedAmount);
              }
            } catch (err) {
              console.error("Error decrypting amount:", err);
            }
          }
          return { ...tx, amount };
        })
      );

      const blockedTransactions = processedTransactions.filter(t => t.risk_score >= 70);
      const totalBlocked = blockedTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
      
      const verifiedTransactions = processedTransactions.filter(t => t.is_fraudulent !== null);
      const truePositives = verifiedTransactions.filter(t => t.risk_score >= 70 && t.is_fraudulent).length;
      const falsePositives = verifiedTransactions.filter(t => t.risk_score >= 70 && !t.is_fraudulent).length;
      const trueNegatives = verifiedTransactions.filter(t => t.risk_score < 70 && !t.is_fraudulent).length;
      const falseNegatives = verifiedTransactions.filter(t => t.risk_score < 70 && t.is_fraudulent).length;

      const totalVerified = verifiedTransactions.length;
      const falsePositiveRate = totalVerified ? (falsePositives / totalVerified) * 100 : 0;
      const falseNegativeRate = totalVerified ? (falseNegatives / totalVerified) * 100 : 0;
      
      const affectedCustomers = new Set(blockedTransactions.map(t => t.amount)).size;
      const customerImpactRate = transactions.length ? (affectedCustomers / transactions.length) * 100 : 0;

      console.log("Business intelligence metrics calculated successfully");

      return {
        roi: totalBlocked * 0.15,
        savings: totalBlocked,
        falsePositiveRate,
        falseNegativeRate,
        customerImpactRate,
        totalTransactions: transactions.length,
        affectedCustomers
      };
    },
    refetchInterval: 30000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorHandler: (error: Error) => {
        console.error("Failed to fetch business metrics:", error);
        toast({
          title: "Error",
          description: "Failed to load business metrics. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });
};