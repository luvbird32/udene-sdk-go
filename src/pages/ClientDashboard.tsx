import { Tabs } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/client-dashboard/tabs/DashboardHeader";
import { DashboardTabs } from "@/components/client-dashboard/tabs/DashboardTabs";
import { DashboardTabContent } from "@/components/client-dashboard/tabs/DashboardTabContent";
import { useClientMetrics } from "@/hooks/useClientMetrics";

const ClientDashboard = () => {
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useClientMetrics();

  return (
    <div className="min-h-screen bg-background p-6">
      <DashboardHeader />

      <Tabs defaultValue="dashboard" className="space-y-6">
        <DashboardTabs />
        <DashboardTabContent 
          metrics={metrics}
          metricsLoading={metricsLoading}
          metricsError={metricsError}
        />
      </Tabs>
    </div>
  );
};

export default ClientDashboard;