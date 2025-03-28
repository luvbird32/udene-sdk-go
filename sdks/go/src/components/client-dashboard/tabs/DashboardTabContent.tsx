
/**
 * DashboardTabContent Component
 * 
 * Manages and renders different tab sections of the client dashboard including:
 * - Main dashboard overview with metrics and monitoring
 * - Services management for configuring client services
 * - Security settings and program management 
 * - Reports generation and management
 * - API credentials and documentation
 * - Webhook configuration
 * - Trigger management
 * - Client profile settings
 * - Investigation logs and management
 * - Project settings
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.metrics - Dashboard metrics data
 * @param {number} props.metrics.riskScore - Overall risk assessment score
 * @param {number} props.metrics.totalTransactions - Total number of processed transactions
 * @param {number} props.metrics.flaggedTransactions - Number of transactions flagged as suspicious
 * @param {boolean} props.metricsLoading - Loading state for metrics data
 * @param {Error} props.metricsError - Error object if metrics fetch fails
 */
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
import { ProjectSettings } from "../projects/ProjectSettings";

interface DashboardTabContentProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  metricsLoading?: boolean;
  metricsError?: Error | null;
}

export const DashboardTabContent = ({ 
  metrics = null, 
  metricsLoading = false, 
  metricsError = null 
}: DashboardTabContentProps) => {
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

      <TabsContent value="project-settings" className="space-y-6">
        <ProjectSettings />
      </TabsContent>
    </>
  );
};
