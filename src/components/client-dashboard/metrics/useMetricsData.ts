import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useMetricsData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["client-metrics"],
    queryFn: async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Error getting user:", userError);
          throw userError;
        }

        if (!user) {
          console.error("No user found");
          throw new Error("No user found");
        }

        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('risk_score, is_fraudulent')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching transactions:", error);
          throw error;
        }

        if (!transactions || transactions.length === 0) {
          console.log("No transactions found");
          return {
            riskScore: 0,
            totalTransactions: 0,
            flaggedTransactions: 0
          };
        }

        const totalTransactions = transactions.length;
        const flaggedTransactions = transactions.filter(t => t.is_fraudulent).length;
        
        const validRiskScores = transactions.filter(t => 
          typeof t.risk_score === 'number' && !isNaN(t.risk_score)
        );

        const averageRiskScore = validRiskScores.length > 0
          ? Math.round(validRiskScores.reduce((acc, t) => acc + (t.risk_score || 0), 0) / validRiskScores.length)
          : 0;

        console.log("Metrics calculated:", {
          riskScore: averageRiskScore,
          totalTransactions,
          flaggedTransactions
        });

        return {
          riskScore: averageRiskScore,
          totalTransactions,
          flaggedTransactions
        };
      } catch (error) {
        console.error("Error in metrics query:", error);
        throw error;
      }
    },
    refetchInterval: 30000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorHandler: (error: Error) => {
        toast({
          title: "Error",
          description: "Failed to load metrics data",
          variant: "destructive",
        });
      },
    },
  });
};