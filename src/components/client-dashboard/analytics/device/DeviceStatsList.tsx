/**
 * DeviceStatsList Component
 * 
 * Displays a scrollable list of recent device statistics, showing
 * the date and number of devices detected for each entry.
 *
 * @component
 * @example
 * ```tsx
 * const stats = [
 *   { date: "2024-03-01", count: 15 },
 *   { date: "2024-03-02", count: 23 }
 * ];
 * <DeviceStatsList stats={stats} />
 * ```
 */
import { ScrollArea } from "@/components/ui/scroll-area";

interface DeviceStatsListProps {
  /** Array of device statistics to display */
  stats: Array<{
    /** The date of the device activity */
    date: string;
    /** The number of devices detected on this date */
    count: number;
  }>;
}

export const DeviceStatsList = ({ stats }: DeviceStatsListProps) => {
  return (
    <ScrollArea className="h-[100px]">
      <div className="space-y-2">
        {stats.slice(0, 3).map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
            <span className="text-sm">{stat.date}</span>
            <span className="text-sm font-medium">{stat.count} devices</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};