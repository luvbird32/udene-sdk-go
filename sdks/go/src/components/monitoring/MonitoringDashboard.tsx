
import { SecurityMonitor } from "./SecurityMonitor";
import { AutomatedResponse } from "./AutomatedResponse";
import { AuditLogger } from "./AuditLogger";
import { IPAddressMonitoring } from "./IPAddressMonitoring";
import { AnalyticsMetrics } from "./AnalyticsMetrics";

export const MonitoringDashboard = () => {
  return (
    <div className="space-y-6">
      <SecurityMonitor />
      <IPAddressMonitoring />
      <AnalyticsMetrics />
      <AutomatedResponse />
      <AuditLogger />
    </div>
  );
};
