import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface RiskScoreChartProps {
  data: Array<{
    timestamp: string;
    score: number;
  }>;
}

export const RiskScoreChart = ({ data }: RiskScoreChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
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
  );
};