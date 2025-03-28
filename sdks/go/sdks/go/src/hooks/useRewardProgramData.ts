import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useRewardProgramData = () => {
  return useQuery({
    queryKey: ["reward-program-metrics"],
    queryFn: async () => {
      const { data: rewards, error } = await supabase
        .from('rewards_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Analyze reward patterns
      const patterns = (rewards || []).reduce((acc: any, reward) => {
        // Track rapid redemptions
        if (reward.points_redeemed > 0) {
          acc.redemptions = (acc.redemptions || 0) + 1;
        }
        
        // Track high-value transactions
        if (reward.points_earned > 1000) {
          acc.highValueEarnings = (acc.highValueEarnings || 0) + 1;
        }

        return acc;
      }, {});

      // Group by program types
      const programTypes = (rewards || []).reduce((acc: any, reward) => {
        acc[reward.program_type] = (acc[reward.program_type] || 0) + 1;
        return acc;
      }, {});

      return {
        patterns,
        programTypes,
        recentRewards: rewards
      };
    },
    refetchInterval: 30000,
  });
};