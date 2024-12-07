import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const TransactionTrends = () => {
  const { data: trends } = useQuery({
    queryKey: ["transaction-trends"],
    queryFn: async () => {
      console.log("Fetching transaction trends...");
      const { data, error } = await supabase
        .from('transactions')
        .select('amount, timestamp, risk_score')
        .order('timestamp', { ascending: true })
        .limit(100);

      if (error) throw error;

      // Group transactions by hour
      const hourlyData = (data || []).reduce((acc: any[], transaction) => {
        const hour = new Date(transaction.timestamp).getHours();
        const existing = acc.find(item => item.hour === hour);
        
        if (existing) {
          existing.count += 1;
          existing.totalAmount += Number(transaction.amount);
          existing.avgRiskScore = (existing.avgRiskScore * (existing.count - 1) + transaction.risk_score) / existing.count;
        } else {
          acc.push({
            hour,
            count: 1,
            totalAmount: Number(transaction.amount),
            avgRiskScore: transaction.risk_score
          });
        }
        return acc;
      }, []);

      return hourlyData.sort((a, b) => a.hour - b.hour);
    },
    refetchInterval: 30000,
  });

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Hourly Transaction Trends</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trends ?? []}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" name="Transaction Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};