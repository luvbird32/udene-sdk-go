import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PeakTimesChartProps {
  data: Array<{
    hour: string;
    count: number;
  }>;
}

export const PeakTimesChart = ({ data }: PeakTimesChartProps) => (
  <div className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Bar 
          dataKey="count" 
          fill="#8884d8" 
          name="Transaction Count"
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);