import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface DistributionChartProps {
  distribution: Array<{ name: string; value: number }>;
}

export const DistributionChart = ({ distribution }: DistributionChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={distribution}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {distribution?.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);