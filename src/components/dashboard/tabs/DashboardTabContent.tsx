import { TabsContent } from "@/components/ui/tabs";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { ClientAnalytics } from "@/components/dashboard/analytics/ClientAnalytics";
import { UsageAnalytics } from "@/components/dashboard/analytics/UsageAnalytics";
import { SecuritySection } from "@/components/dashboard/SecuritySection";
import { InfrastructureSection } from "@/components/dashboard/InfrastructureSection";
import DatabaseSection from "@/components/dashboard/DatabaseSection";
import { DataExtractionSection } from "@/components/dashboard/DataExtractionSection";
import { ComplianceReporting } from "@/components/compliance/ComplianceReporting";

interface DashboardTabContentProps {
  metrics: any;
  metricsLoading: boolean;
  metricsError: Error | null;
}

export const DashboardTabContent = ({ metrics, metricsLoading, metricsError }: DashboardTabContentProps) => {
  return (
    <>
      <TabsContent value="dashboard" className="glass-card p-6 rounded-lg">
        <DashboardContent 
          metrics={metrics}
          metricsLoading={metricsLoading}
          metricsError={metricsError}
        />
      </TabsContent>

      <TabsContent value="users" className="glass-card p-6 rounded-lg">
        <UserManagement />
      </TabsContent>

      <TabsContent value="client-analytics" className="glass-card p-6 rounded-lg">
        <ClientAnalytics />
      </TabsContent>

      <TabsContent value="usage-analytics" className="glass-card p-6 rounded-lg">
        <UsageAnalytics />
      </TabsContent>

      <TabsContent value="security" className="glass-card p-6 rounded-lg">
        <SecuritySection />
      </TabsContent>

      <TabsContent value="infrastructure" className="glass-card p-6 rounded-lg">
        <InfrastructureSection />
      </TabsContent>

      <TabsContent value="database" className="glass-card p-6 rounded-lg">
        <DatabaseSection />
        <div className="mt-8">
          <DataExtractionSection />
        </div>
      </TabsContent>

      <TabsContent value="compliance" className="glass-card p-6 rounded-lg">
        <ComplianceReporting />
      </TabsContent>
    </>
  );
};