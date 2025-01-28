import { Card } from "@/components/ui/card";
import { Button } from "@/components/shared/ui/Button";
import { MonitoringDashboard } from "@/components/monitoring/MonitoringDashboard";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { AutomatedResponse } from "@/components/monitoring/AutomatedResponse";
import { AuditLogger } from "@/components/monitoring/AuditLogger";
import { ClientAnalytics } from "@/components/dashboard/analytics/ClientAnalytics";
import { UsageAnalytics } from "@/components/dashboard/analytics/UsageAnalytics";
import { ExploitationMetrics } from "@/components/monitoring/ExploitationMetrics";
import { TransactionTrends } from "@/components/monitoring/transaction/TransactionTrends";
import { FlaggedDevices } from "@/components/monitoring/FlaggedDevices";
import { CustomerBehavior } from "@/components/monitoring/CustomerBehavior";
import { FeedbackManagement } from "@/components/monitoring/FeedbackManagement";
import { BusinessIntelligence } from "@/components/client-dashboard/analytics/BusinessIntelligence";
import { UserMetrics } from "@/components/dashboard/metrics/UserMetrics";
import { InvestigationSection } from "@/components/admin-dashboard/investigation/InvestigationSection";
import { useNavigate } from "react-router-dom";
import { Users, ScanSearch } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button 
            variant="outline"
            onClick={() => navigate('/security-scan')}
            className="flex items-center gap-2"
          >
            <ScanSearch className="h-4 w-4" />
            Security Scan
          </Button>
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

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Key Performance Metrics</h2>
          <UserMetrics />
        </Card>
      </div>

      {/* Security & Risk Monitoring */}
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

      {/* Fraud Detection & Investigation */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Fraud Detection & Investigation</h2>
        <div className="space-y-6">
          <ExploitationMetrics />
          <InvestigationSection />
        </div>
      </Card>

      {/* Transaction & User Behavior */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Transaction Analysis</h2>
          <TransactionTrends />
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Device Security</h2>
          <FlaggedDevices />
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">User Behavior Analysis</h2>
          <CustomerBehavior />
        </Card>
      </div>

      {/* Feedback & Business Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Feedback Management</h2>
          <FeedbackManagement />
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Business Intelligence</h2>
          <BusinessIntelligence />
        </Card>
      </div>

      {/* Analytics & Monitoring */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Client Analytics</h2>
          <ClientAnalytics />
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Usage Analytics</h2>
          <UsageAnalytics />
        </Card>
      </div>

      {/* System Monitoring & Response */}
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
    </div>
  );
};

export default AdminDashboard;