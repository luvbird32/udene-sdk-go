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

  // Handle errors from both props and hook
  if (error || metricsError) {
    return <MetricsError error={error || metricsError} />;
  }

  // Use metrics from props if available, otherwise use from hook
  const displayMetrics = metrics || metricsData;
  const isLoadingState = isLoading || metricsLoading;

  // Show empty state if no data and not loading
  if (!displayMetrics && !isLoadingState) {
    return <EmptyMetrics />;
  }

  // Ensure we have default values to prevent null access
  const safeMetrics = {
    riskScore: displayMetrics?.riskScore ?? 0,
    totalTransactions: displayMetrics?.totalTransactions ?? 0,
    flaggedTransactions: displayMetrics?.flaggedTransactions ?? 0
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Risk Score"
        value={`${safeMetrics.riskScore}%`}
        icon={Shield}
        description="Current risk assessment score"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Total Transactions"
        value={safeMetrics.totalTransactions}
        icon={Activity}
        description="Number of processed transactions"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Flagged Transactions"
        value={safeMetrics.flaggedTransactions}
        icon={AlertTriangle}
        description="Transactions requiring attention"
        isLoading={isLoadingState}
      />
    </div>
  );
};