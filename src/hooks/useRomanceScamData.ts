import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useRomanceScamData = () => {
  return useQuery({
    queryKey: ["romance-scam-metrics"],
    queryFn: async () => {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('message_velocity, profile_changes, interaction_patterns, risk_score')
        .not('message_velocity', 'is', null)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Group by risk levels
      const riskLevels = (transactions || []).reduce((acc: any, tx) => {
        const riskLevel = tx.risk_score >= 70 ? 'High' : tx.risk_score >= 40 ? 'Medium' : 'Low';
        acc[riskLevel] = (acc[riskLevel] || 0) + 1;
        return acc;
      }, {});

      // Analyze patterns
      const patterns = (transactions || []).reduce((acc: any, tx) => {
        if (tx.message_velocity > 50) acc.highVelocity = (acc.highVelocity || 0) + 1;
        if (tx.profile_changes && Object.keys(tx.profile_changes).length > 0) {
          acc.profileChanges = (acc.profileChanges || 0) + 1;
        }
        if (tx.interaction_patterns?.multiple_devices) {
          acc.multipleDevices = (acc.multipleDevices || 0) + 1;
        }
        return acc;
      }, {});

      return {
        riskLevels,
        patterns,
        recentTransactions: transactions
      };
    },
    refetchInterval: 30000,
  });
};