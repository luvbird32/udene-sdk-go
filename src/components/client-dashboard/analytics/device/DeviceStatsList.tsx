import { ScrollArea } from "@/components/ui/scroll-area";

interface DeviceStatsListProps {
  stats: Array<{
    date: string;
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