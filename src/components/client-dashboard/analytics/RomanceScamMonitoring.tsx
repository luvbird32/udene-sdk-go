/**
 * RomanceScamMonitoring Component
 * 
 * Visualizes and analyzes potential romance scam activities through a pie chart.
 * This component helps identify and track:
 * - Distribution of risk levels across user interactions
 * - Patterns in suspicious romantic relationships
 * - Potential financial exploitation attempts
 * 
 * The data is presented as a pie chart showing the proportion of:
 * - High-risk interactions
 * - Medium-risk interactions
 * - Low-risk interactions
 * 
 * @example
 * ```tsx
 * <RomanceScamMonitoring />
 * ```
 */
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { HeartCrack } from "lucide-react";

interface RiskLevelData {
  name: string;
  value: number;
}

const COLORS = ['#ef4444', '#f97316', '#22c55e'];

export const RomanceScamMonitoring = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["romance-scam-stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('risk_score')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Calculate risk level distribution
      const riskLevels = {
        "High Risk": 0,
        "Medium Risk": 0,
        "Low Risk": 0
      };

      transactions?.forEach(transaction => {
        if (transaction.risk_score >= 70) {
          riskLevels["High Risk"]++;
        } else if (transaction.risk_score >= 40) {
          riskLevels["Medium Risk"]++;
        } else {
          riskLevels["Low Risk"]++;
        }
      });

      return { riskLevels };
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Romance Scam Analysis</h3>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading analysis...</p>
        </div>
      </Card>
    );
  }

  const chartData: RiskLevelData[] = data ? Object.entries(data.riskLevels).map(([name, value]) => ({
    name,
    value: value as number
  })) : [];

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <HeartCrack className="h-5 w-5 text-destructive" />
          <h3 className="font-semibold">Romance Scam Analysis</h3>
        </div>
        <Badge variant="outline">Last 100 Interactions</Badge>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};