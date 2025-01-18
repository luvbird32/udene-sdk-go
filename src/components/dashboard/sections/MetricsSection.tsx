import { ClientMetrics } from "@/components/client-dashboard/ClientMetrics";
import ErrorBoundary from "@/components/ErrorBoundary";

interface MetricsSectionProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  metricsLoading?: boolean;
  metricsError?: Error | null;
}

export const MetricsSection = ({ 
  metrics, 
  metricsLoading, 
  metricsError 
}: MetricsSectionProps) => {
  return (
    <ErrorBoundary>
      <ClientMetrics 
        metrics={metrics}
        isLoading={metricsLoading}
        error={metricsError}
      />
    </ErrorBoundary>
  );
};