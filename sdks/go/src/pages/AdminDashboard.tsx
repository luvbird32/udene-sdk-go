import { DashboardHeader } from "@/components/admin-dashboard/sections/DashboardHeader";
import { PerformanceMetricsSection } from "@/components/admin-dashboard/sections/PerformanceMetricsSection";
import { SecurityMonitoringSection } from "@/components/admin-dashboard/sections/SecurityMonitoringSection";
import { FraudDetectionSection } from "@/components/admin-dashboard/sections/FraudDetectionSection";
import { AnalyticsSection } from "@/components/admin-dashboard/sections/AnalyticsSection";
import { SystemMonitoringSection } from "@/components/admin-dashboard/sections/SystemMonitoringSection";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <DashboardHeader />
      <PerformanceMetricsSection />
      <SecurityMonitoringSection />
      <FraudDetectionSection />
      <AnalyticsSection />
      <SystemMonitoringSection />
    </div>
  );
};

export default AdminDashboard;