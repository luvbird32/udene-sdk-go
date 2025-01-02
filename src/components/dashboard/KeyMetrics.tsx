import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface KeyMetricsProps {
  metrics: {
    activeUsers?: number;
    avgProcessingTime?: number;
    concurrentCalls?: number;
  };
  isLoading: boolean;
}

export const KeyMetrics = ({ metrics, isLoading }: KeyMetricsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <Skeleton className="h-4 w-[100px] mb-2" />
          <Skeleton className="h-8 w-[60px]" />
        </Card>
        <Card className="p-6">
          <Skeleton className="h-4 w-[100px] mb-2" />
          <Skeleton className="h-8 w-[60px]" />
        </Card>
        <Card className="p-6">
          <Skeleton className="h-4 w-[100px] mb-2" />
          <Skeleton className="h-8 w-[60px]" />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
        <p className="text-2xl font-bold mt-2">{metrics.activeUsers ?? 0}</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Avg Processing Time</h3>
        <p className="text-2xl font-bold mt-2">{metrics.avgProcessingTime ?? 0} ms</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Concurrent Calls</h3>
        <p className="text-2xl font-bold mt-2">{metrics.concurrentCalls ?? 0}</p>
      </Card>
    </div>
  );
};