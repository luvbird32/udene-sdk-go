import { Card } from "@/components/ui/card";

interface KeyMetricsProps {
  /** Current system metrics data */
  metrics: {
    activeUsers?: number;
    avgProcessingTime?: number;
    concurrentCalls?: number;
  };
  /** Loading state for metrics data */
  isLoading: boolean;
}

export const KeyMetrics = ({ metrics, isLoading }: KeyMetricsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <Card className="animate-pulse h-24" />
        <Card className="animate-pulse h-24" />
        <Card className="animate-pulse h-24" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <h3 className="text-lg font-semibold">Active Users</h3>
        <p className="text-2xl">{metrics.activeUsers ?? 0}</p>
      </Card>
      <Card>
        <h3 className="text-lg font-semibold">Avg Processing Time</h3>
        <p className="text-2xl">{metrics.avgProcessingTime ?? 0} ms</p>
      </Card>
      <Card>
        <h3 className="text-lg font-semibold">Concurrent Calls</h3>
        <p className="text-2xl">{metrics.concurrentCalls ?? 0}</p>
      </Card>
    </div>
  );
};
