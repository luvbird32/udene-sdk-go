import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

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

      const stats = (data || []).reduce((acc: any, curr) => {
        const riskLevel = curr.risk_score >= 70 ? 'High' : curr.risk_score >= 40 ? 'Medium' : 'Low';
        acc[riskLevel] = (acc[riskLevel] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([name, value]) => ({ name, value }));
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Referral Fraud Risk Distribution</h3>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading referral data...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Referral Fraud Risk Distribution</h3>
        <Badge variant="outline">Last 100 Referrals</Badge>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={referralStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};