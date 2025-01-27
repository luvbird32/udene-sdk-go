import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export const TransactionTrends = () => {
  const { data: trends, isLoading } = useQuery({
    queryKey: ["admin-transaction-trends"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('created_at, risk_score')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      return data?.map(tx => ({
        date: new Date(tx.created_at).toLocaleDateString(),
        riskScore: tx.risk_score || 0
      }));
    },
    refetchInterval: 30000,
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Transaction Trends</h2>
        </div>
        <Badge variant="outline">Last 100 Transactions</Badge>
      </div>

      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Loading trends...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="riskScore" 
                stroke="hsl(var(--primary))" 
                name="Risk Score"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};