import { Shield, Activity, AlertTriangle } from "lucide-react";
import { MetricCard } from "./metrics/MetricCard";
import { MetricsError } from "./metrics/MetricsError";
import { EmptyMetrics } from "./metrics/EmptyMetrics";
import { useMetricsData } from "./metrics/useMetricsData";

interface ClientMetricsProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  isLoading?: boolean;
  error?: Error | null;
}

export const ClientMetrics = ({ metrics, isLoading, error }: ClientMetricsProps) => {
  const { data: metricsData, isLoading: metricsLoading, error: metricsError } = useMetricsData();

  if (error || metricsError) {
    return <MetricsError error={error || metricsError} />;
  }

  const displayMetrics = metrics || metricsData;
  const isLoadingState = isLoading || metricsLoading;

  if (!displayMetrics && !isLoadingState) {
    return <EmptyMetrics />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Risk Score"
        value={`${displayMetrics?.riskScore ?? 0}%`}
        icon={Shield}
        description="Current risk assessment score"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Total Transactions"
        value={displayMetrics?.totalTransactions ?? 0}
        icon={Activity}
        description="Number of processed transactions"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Flagged Transactions"
        value={displayMetrics?.flaggedTransactions ?? 0}
        icon={AlertTriangle}
        description="Transactions requiring attention"
        isLoading={isLoadingState}
      />
    </div>
  );
};