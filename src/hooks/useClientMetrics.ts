
/**
 * Custom hook for fetching and managing client metrics data
 * 
 * Handles:
 * - Authentication session validation
 * - Transaction data fetching
 * - Risk score calculation
 * - Error handling and notifications
 * - Retry logic for failed requests
 * 
 * @returns {Object} Query result object containing:
 * - data: Processed metrics including risk score and transaction counts
 * - isLoading: Loading state indicator
 * - error: Error object if the fetch fails
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useClientMetrics = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["client-metrics"],
    queryFn: async () => {
      try {
        // Validate authentication session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw new Error("Authentication error");
        }

        if (!session) {
          throw new Error("No active session");
        }

        // Fetch recent transactions
        const { data: recentTransactions, error: transactionsError } = await supabase
          .from('transactions')
          .select('risk_score, is_fraudulent')
          .order('created_at', { ascending: false })
          .limit(100);

        if (transactionsError) {
          console.error("Transaction fetch error:", transactionsError);
          throw transactionsError;
        }

        // Calculate metrics from transaction data
        const validTransactions = recentTransactions?.filter(t => t?.risk_score != null) ?? [];
        const avgRiskScore = validTransactions.length > 0
          ? validTransactions.reduce((acc, t) => acc + (t.risk_score ?? 0), 0) / validTransactions.length
          : 0;

        return {
          riskScore: Math.round(avgRiskScore),
          totalTransactions: validTransactions.length,
          flaggedTransactions: validTransactions.filter(t => t.is_fraudulent).length
        };
      } catch (error) {
        console.error('Error fetching metrics:', error);
        toast({
          variant: "destructive",
          title: "Error loading metrics",
          description: "Failed to load dashboard metrics. Please try again later."
        });
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
