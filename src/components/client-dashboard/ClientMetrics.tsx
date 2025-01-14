import { Shield, Activity, AlertTriangle } from "lucide-react";
import { MetricCard } from "@/components/ui/metrics/MetricCard";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { EmptyState } from "@/components/ui/states/EmptyState";
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

  // Early return for error states
  if (error || metricsError) {
    console.error("Metrics error:", error || metricsError);
    return <ErrorState error={error || metricsError} />;
  }

  // Use provided metrics or fallback to fetched metrics
  const displayMetrics = metrics || metricsData;
  const isLoadingState = isLoading || metricsLoading;

  // Early return for loading state
  if (isLoadingState) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Risk Score"
          value="Loading..."
          icon={Shield}
          description="Current risk assessment score"
          isLoading={true}
        />
        <MetricCard
          title="Total Transactions"
          value="Loading..."
          icon={Activity}
          description="Number of processed transactions"
          isLoading={true}
        />
        <MetricCard
          title="Flagged Transactions"
          value="Loading..."
          icon={AlertTriangle}
          description="Transactions requiring attention"
          isLoading={true}
        />
      </div>
    );
  }

  // Early return for empty state
  if (!displayMetrics) {
    console.log("No metrics data available");
    return <EmptyState title="No Metrics Available" message="No metrics data is currently available." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Risk Score"
        value={`${displayMetrics.riskScore ?? 0}%`}
        icon={Shield}
        description="Current risk assessment score"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Total Transactions"
        value={displayMetrics.totalTransactions ?? 0}
        icon={Activity}
        description="Number of processed transactions"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Flagged Transactions"
        value={displayMetrics.flaggedTransactions ?? 0}
        icon={AlertTriangle}
        description="Transactions requiring attention"
        isLoading={isLoadingState}
      />
    </div>
  );
};