import { Card } from "@/components/ui/card";
import { MonitoringDashboard } from "@/components/monitoring/MonitoringDashboard";
import { AutomatedResponse } from "@/components/monitoring/AutomatedResponse";
import { AuditLogger } from "@/components/monitoring/AuditLogger";

export const SystemMonitoringSection = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">System Monitoring</h2>
        <MonitoringDashboard />
      </Card>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Automated Response</h2>
        <AutomatedResponse />
      </Card>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Audit Logs</h2>
        <AuditLogger />
      </Card>
    </div>
  );
};