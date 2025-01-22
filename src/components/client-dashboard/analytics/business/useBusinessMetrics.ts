import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BusinessMetrics } from "./types";

/**
 * Custom hook to fetch and process business metrics from transaction data
 * Handles encrypted transaction amounts and calculates various fraud detection metrics
 * 
 * @returns {Object} Query result containing business metrics data, loading state, and error state
 */
export const useBusinessMetrics = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["business-metrics"],
    queryFn: async () => {
      console.log("Fetching business metrics...");

      try {
        // Fetch transactions with encrypted amounts and fraud indicators
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

        if (!transactions || transactions.length === 0) {
          console.log("No transactions found");
          return null;
        }

        console.log(`Processing ${transactions.length} transactions for metrics`);

        // Decrypt and process transaction amounts
        const processedTransactions = await Promise.all(
          transactions.map(async (tx) => {
            let amount = 0;
            if (tx.amount_encrypted && tx.amount_iv) {
              try {
                // Decrypt amount using Supabase RPC function
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

        // Calculate metrics for blocked transactions (risk score >= 70)
        const blockedTransactions = processedTransactions.filter(t => t.risk_score >= 70);
        const totalBlocked = blockedTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
        
        // Calculate accuracy metrics for verified transactions
        const verifiedTransactions = processedTransactions.filter(t => t.is_fraudulent !== null);
        const truePositives = verifiedTransactions.filter(t => t.risk_score >= 70 && t.is_fraudulent).length;
        const falsePositives = verifiedTransactions.filter(t => t.risk_score >= 70 && !t.is_fraudulent).length;
        const trueNegatives = verifiedTransactions.filter(t => t.risk_score < 70 && !t.is_fraudulent).length;
        const falseNegatives = verifiedTransactions.filter(t => t.risk_score < 70 && t.is_fraudulent).length;

        // Calculate detection accuracy percentages
        const accuracy = verifiedTransactions.length > 0
          ? ((truePositives + trueNegatives) / verifiedTransactions.length) * 100
          : 0;

        const precision = (truePositives + falsePositives) > 0
          ? (truePositives / (truePositives + falsePositives)) * 100
          : 0;

        const recall = (truePositives + falseNegatives) > 0
          ? (truePositives / (truePositives + falseNegatives)) * 100
          : 0;

        // Return compiled business metrics
        return {
          totalTransactions: transactions.length,
          blockedTransactions: blockedTransactions.length,
          totalAmountBlocked: totalBlocked,
          accuracy,
          precision,
          recall,
          truePositives,
          falsePositives,
          trueNegatives,
          falseNegatives
        };
      } catch (error) {
        console.error("Error calculating business metrics:", error);
        throw error;
      }
    },
    refetchInterval: 30000, // Refresh every 30 seconds
    meta: {
      errorHandler: (error: Error) => {
        console.error("Business metrics error:", error);
        toast({
          title: "Error",
          description: "Failed to load business metrics. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });
};