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
import { FlaggedDevices } from "@/components/monitoring/device/FlaggedDevices";
import { CustomerBehavior } from "@/components/monitoring/CustomerBehavior";
import { FeedbackManagement } from "@/components/monitoring/feedback/FeedbackManagement";
import { BusinessIntelligence } from "@/components/client-dashboard/analytics/BusinessIntelligence";
import { UserMetrics } from "@/components/dashboard/metrics/UserMetrics";
import { InvestigationLogs } from "@/components/client-dashboard/investigation/InvestigationLogs";
import { useNavigate } from "react-router-dom";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { title: "User Metrics", component: <UserMetrics /> },
    { title: "Exploitation Metrics", component: <ExploitationMetrics /> },
    { title: "System Health", component: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <HealthStatus />
        <ErrorLog />
      </div>
    )},
    { title: "Security Investigations", component: (
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Security Investigations</h2>
          <div className="bg-muted/50 rounded-lg">
            <InvestigationLogs />
          </div>
        </div>
      </Card>
    )},
    { title: "Analytics", component: (
      <div className="grid grid-cols-1 gap-6">
        <TransactionTrends />
        <FlaggedDevices />
        <CustomerBehavior />
        <FeedbackManagement />
        <BusinessIntelligence />
      </div>
    )},
    { title: "Client Analytics", component: (
      <Card className="p-6">
        <ClientAnalytics />
      </Card>
    )},
    { title: "Usage Analytics", component: (
      <Card className="p-6">
        <UsageAnalytics />
      </Card>
    )},
    { title: "Monitoring", component: <MonitoringDashboard /> },
    { title: "Response & Logging", component: (
      <>
        <AutomatedResponse />
        <AuditLogger />
      </>
    )}
  ];

  const navigateSection = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentSection(prev => prev > 0 ? prev - 1 : sections.length - 1);
    } else {
      setCurrentSection(prev => prev < sections.length - 1 ? prev + 1 : 0);
    }
  };

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

      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          onClick={() => navigateSection('prev')}
          className="p-2"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-xl font-semibold">
          {sections[currentSection].title}
        </h2>
        <Button
          variant="ghost"
          onClick={() => navigateSection('next')}
          className="p-2"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {sections[currentSection].component}
    </div>
  );
};

export default AdminDashboard;