import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface RiskLevelData {
  name: string;
  value: number;
}

export const useRomanceScamData = () => {
  return useQuery({
    queryKey: ["romance-scam-stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('risk_score')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Calculate risk level distribution
      const riskLevels = {
        "High Risk": 0,
        "Medium Risk": 0,
        "Low Risk": 0
      };

      transactions?.forEach(transaction => {
        if (transaction.risk_score >= 70) {
          riskLevels["High Risk"]++;
        } else if (transaction.risk_score >= 40) {
          riskLevels["Medium Risk"]++;
        } else {
          riskLevels["Low Risk"]++;
        }
      });

      return { riskLevels };
    },
    refetchInterval: 30000,
  });
};