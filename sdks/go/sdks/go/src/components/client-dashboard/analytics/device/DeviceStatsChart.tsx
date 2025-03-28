/**
 * DeviceStatsChart Component
 * 
 * A line chart visualization of device fingerprint statistics over time,
 * showing the number of unique devices detected per day.
 *
 * @component
 * @example
 * ```tsx
 * const data = [
 *   { date: "2024-03-01", count: 15 },
 *   { date: "2024-03-02", count: 23 }
 * ];
 * <DeviceStatsChart data={data} />
 * ```
 */
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DeviceStatsChartProps {
  /** Array of data points for the chart */
  data: Array<{
    /** The date of the device activity */
    date: string;
    /** The number of devices detected on this date */
    count: number;
  }>;
}

export const DeviceStatsChart = ({ data }: DeviceStatsChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};