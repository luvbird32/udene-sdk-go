import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface RiskLevelData {
  name: string;
  value: number;
}

interface RomanceScamChartProps {
  data: RiskLevelData[];
}

const COLORS = ['#ef4444', '#f97316', '#22c55e'];

export const RomanceScamChart = ({ data }: RomanceScamChartProps) => {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};