import { TabsContent } from "@/components/ui/tabs";
import { ServiceManager } from "@/components/client-dashboard/services/ServiceManager";
import { SecurityProgramList } from "@/components/client-dashboard/security/SecurityProgramList";
import { ReportManager } from "@/components/client-dashboard/reporting/ReportManager";
import { ClientApiKeyManager } from "@/components/client-dashboard/ClientApiKeyManager";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { WebhookManager } from "@/components/client-dashboard/webhooks/WebhookManager";
import { TriggerManager } from "@/components/client-dashboard/triggers/TriggerManager";
import { ClientProfile } from "@/components/client-dashboard/ClientProfile";
import { InvestigationLogs } from "@/components/client-dashboard/investigation/InvestigationLogs";
import { DashboardContent } from "../DashboardContent";

interface DashboardTabContentProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  metricsLoading?: boolean;
  metricsError?: Error | null;
}

export const DashboardTabContent = ({ metrics, metricsLoading, metricsError }: DashboardTabContentProps) => {
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