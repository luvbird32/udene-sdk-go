import { Card } from "@/components/ui/card";
import { useRomanceScamData } from "@/hooks/useRomanceScamData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { HeartCrack } from "lucide-react";

interface RiskLevelData {
  name: string;
  value: number;
}

const COLORS = ['#ef4444', '#f97316', '#22c55e'];

export const RomanceScamMonitoring = () => {
  const { data, isLoading } = useRomanceScamData();

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