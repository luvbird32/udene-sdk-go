import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReferralChart } from "./referral/ReferralChart";
import { ReferralHeader } from "./referral/ReferralHeader";

interface ReferralStat {
  name: string;
  value: number;
}

export const ReferralFraudMonitoring = () => {
  const { data: referralStats, isLoading } = useQuery({
    queryKey: ["referral-fraud-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('referral_tracking')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      const stats = (data || []).reduce<Record<string, number>>((acc, curr) => {
        const riskLevel = curr.risk_score >= 70 ? 'High' : curr.risk_score >= 40 ? 'Medium' : 'Low';
        acc[riskLevel] = (acc[riskLevel] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([name, value]): ReferralStat => ({ 
        name, 
        value 
      }));
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <ReferralHeader />
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading referral data...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <ReferralHeader />
      <ReferralChart data={referralStats || []} />
    </Card>
  );
};