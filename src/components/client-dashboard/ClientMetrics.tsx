import { useMetricsData } from "./metrics/useMetricsData";
import { MetricsGrid } from "./metrics/MetricsGrid";
import { EmptyMetrics } from "./metrics/EmptyMetrics";
import { MetricsError } from "./metrics/MetricsError";
import { LoadingMetrics } from "./metrics/LoadingMetrics";

interface ClientMetricsProps {
  metrics?: {
    riskScore?: number;
    totalTransactions?: number;
    flaggedTransactions?: number;
    avgProcessingTime?: number;
    concurrentCalls?: number;
    activeUsers?: number;
  } | null;
  isLoading?: boolean;
  error?: Error | null;
}

export const ClientMetrics = ({ 
  metrics: externalMetrics, 
  isLoading: externalLoading = false, 
  error: externalError = null 
}: ClientMetricsProps) => {
  const { data: metricsData, isLoading: metricsLoading, error: metricsError } = useMetricsData();

  // Use provided metrics or fallback to fetched metrics
  const displayMetrics = externalMetrics || metricsData;
  const isLoading = externalLoading || metricsLoading;
  const error = externalError || metricsError;

  if (isLoading) {
    return <LoadingMetrics />;
  }

  if (error) {
    return <MetricsError error={error} />;
  }

  if (!displayMetrics) {
    return <EmptyMetrics />;
  }

  return <MetricsGrid metrics={displayMetrics} isLoading={isLoading} />;
};