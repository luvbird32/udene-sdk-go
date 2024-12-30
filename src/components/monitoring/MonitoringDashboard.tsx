import { SecurityMonitor } from "./SecurityMonitor";
import { AutomatedResponse } from "./AutomatedResponse";
import { AuditLogger } from "./AuditLogger";

export const MonitoringDashboard = () => {
  return (
    <div className="space-y-6">
      <SecurityMonitor />
      <AutomatedResponse />
      <AuditLogger />
    </div>
  );
};