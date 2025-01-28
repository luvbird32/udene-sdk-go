import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LoadingSpinner } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { EmptyState } from "@/components/ui/states/EmptyState";

export const TransactionTrends = () => {
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ["transaction-trends"],
    queryFn: async () => {
      console.log("Fetching transaction trends...");
      const { data, error } = await supabase
        .from("transactions")
        .select("timestamp, risk_score, amount_encrypted, amount_iv")
        .order("timestamp", { ascending: true })
        .limit(100);

      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }

      // Group transactions by hour and count them
      const hourlyData = data.reduce((acc: any[], transaction) => {
        const hour = new Date(transaction.timestamp).getHours();
        const existing = acc.find(item => item.hour === hour);
        
        if (existing) {
          existing.count += 1;
          existing.avgRisk = (existing.avgRisk * (existing.count - 1) + transaction.risk_score) / existing.count;
        } else {
          acc.push({
            hour,
            count: 1,
            avgRisk: transaction.risk_score || 0
          });
        }
        
        return acc;
      }, []);

      // Sort by hour
      return hourlyData.sort((a, b) => a.hour - b.hour);
    }
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <LoadingSpinner />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <ErrorState 
          title="Failed to load transaction trends" 
          message="There was an error loading the transaction data. Please try again later."
        />
      </Card>
    );
  }

  if (!transactions?.length) {
    return (
      <Card className="p-6">
        <EmptyState 
          title="No transaction data" 
          message="There are no transactions to display yet."
        />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Transaction Trends</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="hour" 
              label={{ value: 'Hour of Day', position: 'bottom' }}
            />
            <YAxis 
              yAxisId="left"
              label={{ value: 'Transaction Count', angle: -90, position: 'left' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              domain={[0, 100]}
              label={{ value: 'Avg Risk Score', angle: 90, position: 'right' }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="count"
              stroke="#2563eb"
              name="Transaction Count"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgRisk"
              stroke="#dc2626"
              name="Average Risk Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};