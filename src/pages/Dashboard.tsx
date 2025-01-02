import { useRoleAuth } from "@/hooks/useRoleAuth";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMetrics } from "@/hooks/useMetrics";

const Dashboard = () => {
  const { isLoading: authLoading } = useRoleAuth(['admin']);
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useMetrics();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto py-6 space-y-6">
        <DashboardContent 
          metrics={metrics}
          metricsLoading={metricsLoading}
          metricsError={metricsError}
        />
      </main>
    </div>
  );
};

export default Dashboard;