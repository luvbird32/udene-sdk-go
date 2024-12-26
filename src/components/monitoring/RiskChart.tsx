import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TooltipProvider, Tooltip as UITooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="factor" width={100} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <div className="bg-background border rounded-lg p-2">
                          <p className="font-medium">{payload[0].payload.factor}</p>
                          <p className="text-sm text-muted-foreground">
                            Importance: {payload[0].value.toFixed(1)}%
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Risk factor importance score</p>
                      </TooltipContent>
                    </UITooltip>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="importance" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </TooltipProvider>
  );
};