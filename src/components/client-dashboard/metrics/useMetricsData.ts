import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useMetricsData = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["client-metrics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: transactions } = await supabase
        .from('transactions')
        .select('risk_score, is_fraudulent')
        .order('created_at', { ascending: false });

      if (!transactions) return null;

      const totalTransactions = transactions.length;
      const flaggedTransactions = transactions.filter(t => t.is_fraudulent).length;
      
      const validRiskScores = transactions.filter(t => 
        typeof t.risk_score === 'number' && !isNaN(t.risk_score)
      );

      const averageRiskScore = validRiskScores.length > 0
        ? Math.round(validRiskScores.reduce((acc, t) => acc + t.risk_score!, 0) / validRiskScores.length)
        : 0;

      return {
        riskScore: averageRiskScore,
        totalTransactions,
        flaggedTransactions
      };
    },
    refetchInterval: 30000,
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