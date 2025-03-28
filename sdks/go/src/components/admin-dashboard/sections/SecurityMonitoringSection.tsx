import { Card } from "@/components/ui/card";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { ErrorLog } from "@/components/monitoring/ErrorLog";

export const SecurityMonitoringSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">System Health</h2>
        <HealthStatus />
      </Card>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Error Monitoring</h2>
        <ErrorLog />
      </Card>
    </div>
  );
};