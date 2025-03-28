import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { EmailChange } from "./types";

interface EmailChangeChartProps {
  data: EmailChange[];
}

export const EmailChangeChart = ({ data }: EmailChangeChartProps) => {
  const chartData = data?.map(change => ({
    timestamp: new Date(change.changed_at).toLocaleDateString(),
    riskScore: change.risk_score
  })) || [];

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="riskScore"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};