import { TabsContent } from "@/components/ui/tabs";
import { ServiceManager } from "@/components/client-dashboard/services/ServiceManager";
import { ReportManager } from "@/components/client-dashboard/reporting/ReportManager";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { ClientApiKeyManager } from "@/components/client-dashboard/ClientApiKeyManager";
import { ClientProfile } from "@/components/client-dashboard/ClientProfile";
import { WebhookManager } from "@/components/client-dashboard/webhooks/WebhookManager";
import { TriggerManager } from "@/components/client-dashboard/triggers/TriggerManager";
import { InvestigationLogs } from "@/components/client-dashboard/investigation/InvestigationLogs";
import { DashboardOverview } from "./DashboardOverview";

interface DashboardTabContentProps {
  metrics: any;
  metricsLoading: boolean;
  metricsError: Error | null;
}

export const DashboardTabContent = ({ metrics, metricsLoading, metricsError }: DashboardTabContentProps) => {
  return (
    <>
      <TabsContent value="dashboard" className="space-y-6">
        <DashboardOverview 
          metrics={metrics}
          metricsLoading={metricsLoading}
          metricsError={metricsError}
        />
      </TabsContent>

      <TabsContent value="services" className="space-y-6">
        <ServiceManager />
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