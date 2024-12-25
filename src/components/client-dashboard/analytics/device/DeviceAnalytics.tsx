import { DeviceStatsChart } from "./DeviceStatsChart";
import { DeviceStatsList } from "./DeviceStatsList";

interface DeviceData {
  date: string;
  count: number;
}

interface DeviceAnalyticsProps {
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