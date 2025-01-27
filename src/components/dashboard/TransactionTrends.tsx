import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const TransactionTrends = () => {
  const { data: trends, error, isLoading } = useQuery({
    queryKey: ["transaction-trends"],
    queryFn: async () => {
      console.log("Fetching transaction trends...");
      const { data, error } = await supabase
        .from('transactions')
        .select('amount_encrypted, amount_iv, timestamp, risk_score')
        .order('timestamp', { ascending: true })
        .limit(100);

      if (error) throw error;

      // Group transactions by hour with null checks
      const hourlyData = (data || []).reduce((acc: any[], transaction) => {
        const hour = new Date(transaction.timestamp).getHours();
        const existing = acc.find(item => item.hour === hour);
        const riskScore = Number(transaction.risk_score) || 0;
        
        if (existing) {
          existing.count += 1;
          existing.avgRiskScore = (existing.avgRiskScore * (existing.count - 1) + riskScore) / existing.count;
        } else {
          acc.push({
            hour,
            count: 1,
            avgRiskScore: riskScore
          });
        }
        return acc;
      }, []);

      return hourlyData.sort((a, b) => a.hour - b.hour);
    },
    refetchInterval: 30000,
  });

  if (error) {
    return (
      <Card className="p-4">
        <Alert variant="destructive">
          <AlertDescription>
            Error loading transaction trends: {error.message}
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (isLoading || !trends) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Hourly Transaction Trends</h3>
        <div className="h-[200px] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Hourly Transaction Trends</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trends}>
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