import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

export const TrendAnalysis = () => {
  const { data: trends, isLoading } = useQuery({
    queryKey: ["transaction-trends"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('transactions')
        .select('amount, created_at')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      // Group by date and calculate daily totals
      const dailyTotals = (data || []).reduce((acc: any, transaction) => {
        const date = format(new Date(transaction.created_at), 'MMM d');
        if (!acc[date]) {
          acc[date] = {
            date,
            total: 0,
            count: 0
          };
        }
        acc[date].total += Number(transaction.amount);
        acc[date].count += 1;
        return acc;
      }, {});

      return Object.values(dailyTotals);
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Transaction Trends</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading trends...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Transaction Trends</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trends}>
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="total" name="Total Amount" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="count" name="Transaction Count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};