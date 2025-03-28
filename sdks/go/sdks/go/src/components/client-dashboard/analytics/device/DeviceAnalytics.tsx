/**
 * DeviceAnalytics Component
 * 
 * Renders the analytics section for device fingerprint data, including
 * a chart visualization and a list of recent device statistics.
 *
 * @component
 * @example
 * ```tsx
 * const data = [
 *   { date: "2024-03-01", count: 15 },
 *   { date: "2024-03-02", count: 23 }
 * ];
 * <DeviceAnalytics data={data} />
 * ```
 */
import { DeviceStatsChart } from "./DeviceStatsChart";
import { DeviceStatsList } from "./DeviceStatsList";

interface DeviceData {
  /** The date of the device activity */
  date: string;
  /** The number of devices detected on this date */
  count: number;
}

interface DeviceAnalyticsProps {
  /** Array of device activity data points */
  data: DeviceData[];
}

export const DeviceAnalytics = ({ data }: DeviceAnalyticsProps) => {
  return (
    <>
      <div className="h-[200px] mb-4">
        <DeviceStatsChart data={data} />
      </div>
      <DeviceStatsList stats={data} />
    </>
  );
};