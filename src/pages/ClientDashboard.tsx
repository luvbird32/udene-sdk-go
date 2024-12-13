import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ServiceManager } from "@/components/client-dashboard/services/ServiceManager";
import { ReportManager } from "@/components/client-dashboard/reporting/ReportManager";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { ClientApiKeyManager } from "@/components/client-dashboard/ClientApiKeyManager";
import { ClientProfile } from "@/components/client-dashboard/ClientProfile";
import { WebhookManager } from "@/components/client-dashboard/webhooks/WebhookManager";
import { TriggerManager } from "@/components/client-dashboard/triggers/TriggerManager";
import { InvestigationLogs } from "@/components/client-dashboard/investigation/InvestigationLogs";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/client-dashboard/tabs/DashboardHeader";
import { DashboardTabs } from "@/components/client-dashboard/tabs/DashboardTabs";
import { DashboardOverview } from "@/components/client-dashboard/tabs/DashboardOverview";

const ClientDashboard = () => {
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["client-metrics"],
    queryFn: async () => {
      try {
        const { data: recentTransactions, error: transactionsError } = await supabase
          .from('transactions')
          .select('risk_score, is_fraudulent')
          .order('created_at', { ascending: false })
          .limit(100);

        if (transactionsError) throw transactionsError;

        const validTransactions = recentTransactions?.filter(t => t?.risk_score != null) ?? [];
        const avgRiskScore = validTransactions.length > 0
          ? validTransactions.reduce((acc, t) => acc + (t.risk_score ?? 0), 0) / validTransactions.length
          : 0;

        return {
          riskScore: Math.round(avgRiskScore),
          totalTransactions: validTransactions.length,
          flaggedTransactions: validTransactions.filter(t => t.is_fraudulent).length
        };
      } catch (error) {
        console.error('Error fetching metrics:', error);
        throw error;
      }
    },
    refetchInterval: 30000,
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <DashboardHeader />

      <Tabs defaultValue="dashboard" className="space-y-6">
        <DashboardTabs />

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
      </Tabs>
    </div>
  );
};

export default ClientDashboard;