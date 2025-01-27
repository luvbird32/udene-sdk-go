import { Card } from "@/components/ui/card";
import { MonitoringDashboard } from "@/components/monitoring/MonitoringDashboard";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { AutomatedResponse } from "@/components/monitoring/AutomatedResponse";
import { AuditLogger } from "@/components/monitoring/AuditLogger";
import { ClientAnalytics } from "@/components/dashboard/analytics/ClientAnalytics";
import { UsageAnalytics } from "@/components/dashboard/analytics/UsageAnalytics";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <HealthStatus />
        <ErrorLog />
      </div>

      <Card className="p-6">
        <ClientAnalytics />
      </Card>

      <Card className="p-6">
        <UsageAnalytics />
      </Card>

      <MonitoringDashboard />
      
      {/* Background monitoring components */}
      <AutomatedResponse />
      <AuditLogger />
    </div>
  );
};

export default AdminDashboard;