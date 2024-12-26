import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

interface RiskChartProps {
  data: Array<{
    timestamp: string;
    value: number | string;
  }>;
  title?: string;
}

const formatValue = (value: number | string): string => {
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  return String(value);
};

export const RiskChart = ({ data, title = 'Risk Analysis' }: RiskChartProps) => {
  const processedData = data.map(item => ({
    ...item,
    value: typeof item.value === 'string' ? parseFloat(item.value) || 0 : item.value
  }));

  return (
    <Card className="p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={processedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip
              formatter={(value: number | string) => [
                formatValue(value),
                'Risk Score'
              ]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};