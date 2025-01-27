import { Card } from "@/components/ui/card";
import { Button } from "@/components/shared/ui/Button";
import { MonitoringDashboard } from "@/components/monitoring/MonitoringDashboard";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { AutomatedResponse } from "@/components/monitoring/AutomatedResponse";
import { AuditLogger } from "@/components/monitoring/AuditLogger";
import { ClientAnalytics } from "@/components/dashboard/analytics/ClientAnalytics";
import { UsageAnalytics } from "@/components/dashboard/analytics/UsageAnalytics";
import { RiskIndicators } from "@/components/monitoring/RiskIndicators";
import { ExploitationMetrics } from "@/components/monitoring/ExploitationMetrics";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button 
            variant="outline"
            onClick={() => navigate('/users')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            User Management
          </Button>
        </div>
      </div>
      
      <ExploitationMetrics />
      
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