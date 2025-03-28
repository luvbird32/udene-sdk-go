import { Card } from "@/components/ui/card";
import { UserMetrics } from "@/components/dashboard/metrics/UserMetrics";

export const PerformanceMetricsSection = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Key Performance Metrics</h2>
        <UserMetrics />
      </Card>
    </div>
  );
};