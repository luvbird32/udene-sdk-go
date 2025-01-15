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
import { ProjectManagement } from "../ProjectManagement";
import { useProject } from "@/contexts/ProjectContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const DashboardTabContent = () => {
  const { currentProject } = useProject();

  return (
    <>
      <TabsContent value="dashboard">
        <DashboardContent />
      </TabsContent>

      <TabsContent value="services">
        {currentProject ? (
          <ServiceManager />
        ) : (
          <Alert>
            <AlertDescription>
              Please select a project to manage services.
            </AlertDescription>
          </Alert>
        )}
      </TabsContent>

      <TabsContent value="security">
        <SecurityProgramList />
      </TabsContent>

      <TabsContent value="reports">
        <ReportManager />
      </TabsContent>

      <TabsContent value="api">
        <ClientApiKeyManager />
        <ApiDocs />
      </TabsContent>

      <TabsContent value="webhooks">
        <WebhookManager />
      </TabsContent>

      <TabsContent value="triggers">
        <TriggerManager />
      </TabsContent>

      <TabsContent value="profile">
        <ClientProfile />
      </TabsContent>

      <TabsContent value="investigations">
        <InvestigationLogs />
      </TabsContent>

      <TabsContent value="project-settings">
        {currentProject ? (
          <ProjectSettings />
        ) : (
          <Alert>
            <AlertDescription>
              Please select a project to manage settings.
            </AlertDescription>
          </Alert>
        )}
      </TabsContent>

      <TabsContent value="project-management">
        <ProjectManagement />
      </TabsContent>
    </>
  );
};