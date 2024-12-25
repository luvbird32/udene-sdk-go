import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTrialStats = () => {
  return useQuery({
    queryKey: ["trial-abuse-stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('trial_usage')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Group data by status and calculate risk levels
      const stats = (data || []).reduce((acc: Record<string, number>, curr) => {
        const riskLevel = curr.risk_score >= 70 ? 'High Risk' : 
                         curr.risk_score >= 40 ? 'Medium Risk' : 
                         'Low Risk';
        acc[riskLevel] = (acc[riskLevel] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([name, value]) => ({
        name,
        value
      }));
    },
    refetchInterval: 30000,
  });
};