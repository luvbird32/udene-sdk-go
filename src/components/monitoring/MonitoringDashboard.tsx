
import { SecurityMonitor } from "./SecurityMonitor";
import { AutomatedResponse } from "./AutomatedResponse";
import { AuditLogger } from "./AuditLogger";
import { IPAddressMonitoring } from "./IPAddressMonitoring";

export const MonitoringDashboard = () => {
  return (
    <div className="space-y-6">
      <SecurityMonitor />
      <IPAddressMonitoring />
      <AutomatedResponse />
      <AuditLogger />
    </div>
  );
};
