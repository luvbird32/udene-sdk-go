import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TransactionChartProps {
  data: Array<{
    date: string;
    riskScore: number;
  }>;
}

export const TransactionChart = ({ data }: TransactionChartProps) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
    </div>
  );
};