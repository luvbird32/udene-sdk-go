import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

export const AffiliateMonitoring = () => {
  const { data: affiliateStats, isLoading } = useQuery({
    queryKey: ["affiliate-fraud-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('affiliate_activities')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      return data?.map(activity => ({
        date: new Date(activity.created_at).toLocaleDateString(),
        riskScore: activity.risk_score || 0,
        amount: activity.transaction_amount || 0
      }));
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Affiliate Activity Monitoring</h3>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading affiliate data...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Affiliate Activity Monitoring</h3>
        <Badge variant="outline">Risk Trends</Badge>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={affiliateStats}>
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="riskScore" stroke="#8884d8" name="Risk Score" />
            <Line yAxisId="right" type="monotone" dataKey="amount" stroke="#82ca9d" name="Transaction Amount" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};