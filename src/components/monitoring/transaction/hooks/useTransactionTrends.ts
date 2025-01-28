import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTransactionTrends = () => {
  return useQuery({
    queryKey: ["admin-transaction-trends"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('created_at, risk_score')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      return data?.map(tx => ({
        date: new Date(tx.created_at).toLocaleDateString(),
        riskScore: tx.risk_score || 0
      }));
    },
    refetchInterval: 30000,
  });
};