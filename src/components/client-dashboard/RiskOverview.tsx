import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const RiskOverview = () => {
  const { data: riskData, isLoading } = useQuery({
    queryKey: ["risk-overview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('risk_score, created_at')
        .order('created_at', { ascending: true })
        .limit(20);

      if (error) throw error;

      return data.map(d => ({
        timestamp: new Date(d.created_at).toLocaleDateString(),
        score: d.risk_score || 0
      }));
    },
    refetchInterval: 30000,
  });

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Risk Score Trend</h3>
      <div className="h-[400px]">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading risk data...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskData}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#8884d8" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};