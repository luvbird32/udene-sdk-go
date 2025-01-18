import { ApiCreditsDisplay } from "@/components/client-dashboard/ApiCreditsDisplay";
import { ClientMetrics } from "@/components/client-dashboard/ClientMetrics";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { AnalyticsGrid } from "@/components/dashboard/AnalyticsGrid";

interface DashboardContentProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  metricsLoading?: boolean;
  metricsError?: Error | null;
}

export const DashboardContent = ({ 
  metrics, 
  metricsLoading, 
  metricsError 
}: DashboardContentProps) => {
  return (
    <div className="space-y-8">
      <ConnectionStatus />
      
      <ErrorBoundary>
        <ApiCreditsDisplay />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <ClientMetrics 
          metrics={metrics}
          isLoading={metricsLoading}
          error={metricsError}
        />
      </ErrorBoundary>
      
      <AnalyticsGrid />
    </div>
  );
};