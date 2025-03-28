import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { InteractionPatterns } from "@/types/fraud";
import type { Json } from "@/integrations/supabase/types";

export interface RomanceScamStats {
  riskLevels: {
    High: number;
    Medium: number;
    Low: number;
  };
  patterns: {
    highVelocity: number;
    profileChanges: number;
    multipleDevices: number;
  };
  recentTransactions: Array<{
    message_velocity: number;
    profile_changes: Record<string, unknown>;
    interaction_patterns: InteractionPatterns;
    risk_score: number;
  }>;
}

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

      // Initialize risk levels with default values
      const riskLevels = {
        High: 0,
        Medium: 0,
        Low: 0
      };

      // Initialize patterns with default values
      const patterns = {
        highVelocity: 0,
        profileChanges: 0,
        multipleDevices: 0
      };

      // Process transactions
      (transactions || []).forEach(tx => {
        // Update risk levels
        const riskLevel = tx.risk_score >= 70 ? 'High' : tx.risk_score >= 40 ? 'Medium' : 'Low';
        riskLevels[riskLevel as keyof typeof riskLevels]++;

        // Update patterns
        if (tx.message_velocity > 50) patterns.highVelocity++;
        if (tx.profile_changes && Object.keys(tx.profile_changes as Record<string, unknown>).length > 0) {
          patterns.profileChanges++;
        }
        const interactionPatterns = tx.interaction_patterns as InteractionPatterns;
        if (interactionPatterns?.multiple_devices) {
          patterns.multipleDevices++;
        }
      });

      const result: RomanceScamStats = {
        riskLevels,
        patterns,
        recentTransactions: (transactions || []).map(tx => ({
          message_velocity: tx.message_velocity,
          profile_changes: tx.profile_changes as Record<string, unknown>,
          interaction_patterns: tx.interaction_patterns as InteractionPatterns,
          risk_score: tx.risk_score
        }))
      };

      return result;
    },
    refetchInterval: 30000,
  });
};