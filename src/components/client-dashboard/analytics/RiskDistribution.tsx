import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const RiskDistribution = () => {
  const { data: riskDistribution, isLoading } = useQuery({
    queryKey: ["risk-distribution"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('transactions')
        .select('risk_score')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) throw error;

      // Group by risk score ranges
      const ranges = Array.from({ length: 10 }, (_, i) => ({
        range: `${i * 10}-${(i + 1) * 10}`,
        count: 0,
      }));

      (data || []).forEach(transaction => {
        if (transaction.risk_score !== null) {
          const rangeIndex = Math.min(Math.floor(transaction.risk_score / 10), 9);
          ranges[rangeIndex].count += 1;
        }
      });

      return ranges;
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Risk Score Distribution</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading risk distribution...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Risk Score Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={riskDistribution}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" name="Transaction Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};