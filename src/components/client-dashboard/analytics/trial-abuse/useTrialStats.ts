import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { TrialUsage } from "@/integrations/supabase/types/trial";

interface TrialStats {
  name: string;
  value: number;
}

export const useTrialStats = () => {
  const { toast } = useToast();

  return useQuery<TrialStats[]>({
    queryKey: ["trial-abuse-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trial_usage')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100) as { data: TrialUsage[] | null, error: Error | null };

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch trial usage data",
          variant: "destructive",
        });
        throw error;
      }

      const stats = (data || []).reduce((acc: Record<string, number>, curr) => {
        const status = curr.status === 'active' ? 
          (curr.risk_score && curr.risk_score >= 70 ? 'High Risk' : 'Active') : 
          'Terminated';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([name, value]) => ({ name, value }));
    },
    refetchInterval: 30000,
  });
};