/**
 * Custom hook for fetching and managing business intelligence metrics
 * 
 * Retrieves and processes transaction data to calculate various business metrics including:
 * - ROI and savings from fraud prevention
 * - False positive/negative rates
 * - Customer impact metrics
 * - Transaction volume statistics
 * - Growth and retention metrics
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BusinessMetrics, TransactionMetrics } from "./types";

export const useBusinessMetrics = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["business-intelligence"],
    queryFn: async () => {
      console.log("Fetching business intelligence metrics...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user found");
        throw new Error("No user found");
      }

      // Fetch transaction data with encrypted fields
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('amount_encrypted, amount_iv, risk_score, is_fraudulent, created_at')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      if (!transactions) {
        console.log("No transactions found");
        return {
          roi: 0,
          savings: 0,
          falsePositiveRate: 0,
          falseNegativeRate: 0,
          customerImpactRate: 0,
          totalTransactions: 0,
          affectedCustomers: 0,
          averageTransactionValue: 0,
          monthlyGrowthRate: 0,
          retentionRate: 0,
          fraudPreventionRate: 0,
          averageResponseTime: 0
        };
      }

      console.log(`Processing ${transactions.length} transactions for metrics`);

      // Process transactions with encrypted amounts
      const processedTransactions = await Promise.all(
        transactions.map(async (t) => {
          let amount = 0;
          if (t.amount_encrypted && t.amount_iv) {
            try {
              const { data: decryptedAmount, error: decryptError } = await supabase.rpc(
                'decrypt_sensitive_data',
                {
                  encrypted_data: t.amount_encrypted,
                  iv: t.amount_iv
                }
              );
              if (!decryptError) {
                amount = Number(decryptedAmount);
              }
            } catch (e) {
              console.error("Error decrypting amount:", e);
            }
          }
          return { ...t, amount };
        })
      );

      // Calculate blocked transactions and amounts
      const blockedTransactions = processedTransactions.filter(t => t.risk_score >= 70);
      const totalBlocked = blockedTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
      
      // Calculate accuracy metrics
      const verifiedTransactions = processedTransactions.filter(t => t.is_fraudulent !== null);
      const truePositives = verifiedTransactions.filter(t => t.risk_score >= 70 && t.is_fraudulent).length;
      const falsePositives = verifiedTransactions.filter(t => t.risk_score >= 70 && !t.is_fraudulent).length;
      const trueNegatives = verifiedTransactions.filter(t => t.risk_score < 70 && !t.is_fraudulent).length;
      const falseNegatives = verifiedTransactions.filter(t => t.risk_score < 70 && t.is_fraudulent).length;

      const totalVerified = verifiedTransactions.length;
      const falsePositiveRate = totalVerified ? (falsePositives / totalVerified) * 100 : 0;
      const falseNegativeRate = totalVerified ? (falseNegatives / totalVerified) * 100 : 0;

      // Calculate customer impact metrics
      const uniqueCustomers = new Set(processedTransactions.map(t => t.amount)).size;
      const affectedCustomers = new Set(blockedTransactions.map(t => t.amount)).size;
      const customerImpactRate = uniqueCustomers ? (affectedCustomers / uniqueCustomers) * 100 : 0;

      // Calculate average transaction value
      const totalValue = processedTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
      const averageTransactionValue = processedTransactions.length ? totalValue / processedTransactions.length : 0;

      // Calculate monthly growth rate
      const lastMonthTransactions = processedTransactions.filter(t => 
        new Date(t.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ).length;
      const previousMonthTransactions = processedTransactions.filter(t =>
        new Date(t.created_at) > new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) &&
        new Date(t.created_at) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ).length;
      const monthlyGrowthRate = previousMonthTransactions ? 
        ((lastMonthTransactions - previousMonthTransactions) / previousMonthTransactions) * 100 : 0;

      // Calculate retention rate (customers who continue after a fraud incident)
      const retainedCustomers = verifiedTransactions.filter(t => !t.is_fraudulent).length;
      const retentionRate = totalVerified ? (retainedCustomers / totalVerified) * 100 : 0;

      // Calculate fraud prevention rate
      const fraudPreventionRate = totalVerified ? 
        (truePositives / (truePositives + falseNegatives)) * 100 : 0;

      // Calculate average response time (mock data - replace with actual timing data)
      const averageResponseTime = 150; // milliseconds

      console.log("Business intelligence metrics calculated successfully");

      return {
        roi: totalBlocked * 0.15, // 15% ROI on prevented fraud
        savings: totalBlocked,
        falsePositiveRate,
        falseNegativeRate,
        customerImpactRate,
        totalTransactions: transactions.length,
        affectedCustomers,
        averageTransactionValue,
        monthlyGrowthRate,
        retentionRate,
        fraudPreventionRate,
        averageResponseTime
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
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