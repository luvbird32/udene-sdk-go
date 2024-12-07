import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface RiskChartProps {
  featureImportance: Record<string, number>;
}

/**
 * Displays a bar chart of risk factors and their importance
 */
export const RiskChart = ({ featureImportance }: RiskChartProps) => {
  // Transform data for the chart
  const chartData = Object.entries(featureImportance)
    .map(([factor, importance]) => ({
      factor,
      importance: Number(importance) * 100,
    }))
    .sort((a, b) => b.importance - a.importance);

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="factor" width={100} />
          <Tooltip />
          <Bar dataKey="importance" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};