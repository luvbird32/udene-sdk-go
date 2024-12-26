import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ReferralStat {
  name: string;
  value: number;
}

export const useReferralStats = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["referral-fraud-stats"],
    queryFn: async () => {
      try {
        console.log("Fetching referral fraud statistics...");
        const { data, error } = await supabase
          .from('referral_tracking')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) {
          console.error("Error fetching referral tracking data:", error);
          throw error;
        }

        console.log(`Processing ${data?.length || 0} referral records`);

        const stats = (data || []).reduce<Record<string, number>>((acc, curr) => {
          const riskLevel = curr.risk_score >= 70 ? 'High' : curr.risk_score >= 40 ? 'Medium' : 'Low';
          acc[riskLevel] = (acc[riskLevel] || 0) + 1;
          return acc;
        }, {});

        console.log("Referral fraud statistics calculated successfully");

        return Object.entries(stats).map(([name, value]): ReferralStat => ({ 
          name, 
          value 
        }));
      } catch (error) {
        console.error("Error in referral fraud statistics calculation:", error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorHandler: (error: Error) => {
        console.error("Failed to fetch referral fraud statistics:", error);
        toast({
          title: "Error",
          description: "Failed to load referral fraud data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });
};