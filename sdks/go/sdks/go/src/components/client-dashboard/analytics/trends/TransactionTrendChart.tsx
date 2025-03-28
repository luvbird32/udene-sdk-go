import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export interface TrendData {
  date: string;
  total: number;
  count: number;
}

interface TransactionTrendChartProps {
  data: TrendData[];
}

export const TransactionTrendChart = ({ data }: TransactionTrendChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <XAxis dataKey="date" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip />
      <Line 
        yAxisId="left" 
        type="monotone" 
        dataKey="total" 
        name="Total Amount" 
        stroke="#8884d8" 
        strokeWidth={2}
      />
      <Line 
        yAxisId="right" 
        type="monotone" 
        dataKey="count" 
        name="Transaction Count" 
        stroke="#82ca9d" 
        strokeWidth={2}
      />
    </LineChart>
  </ResponsiveContainer>
);