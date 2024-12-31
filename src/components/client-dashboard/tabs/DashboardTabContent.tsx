import { Tabs } from "@/components/ui/tabs";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardTabs } from "./DashboardTabs";
import { DashboardContent } from "./DashboardContent";
import { useClientMetrics } from "@/hooks/useClientMetrics";
import { TooltipProvider } from "@/components/ui/tooltip";

export const DashboardTabContent = ({ metrics, metricsLoading, metricsError }) => {
  return (
    <>
      <TabsContent value="dashboard" className="space-y-6">
        <DashboardContent 
          metrics={metrics}
          metricsLoading={metricsLoading}
          metricsError={metricsError}
        />
      </TabsContent>

      <TabsContent value="services" className="space-y-6">
        <ServiceManager />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <SecurityProgramList />
      </TabsContent>

      <TabsContent value="reports" className="space-y-6">
        <ReportManager />
      </TabsContent>

      <TabsContent value="api" className="space-y-6">
        <ClientApiKeyManager />
        <ApiDocs />
      </TabsContent>

      <TabsContent value="webhooks" className="space-y-6">
        <WebhookManager />
      </TabsContent>

      <TabsContent value="triggers" className="space-y-6">
        <TriggerManager />
      </TabsContent>

      <TabsContent value="profile" className="space-y-6">
        <ClientProfile />
      </TabsContent>

      <TabsContent value="investigations" className="space-y-6">
        <InvestigationLogs />
      </TabsContent>
    </>
  );
};