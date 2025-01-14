import { Shield, Activity, AlertTriangle, Clock, Users } from "lucide-react";
import { MetricCard } from "@/components/ui/metrics/MetricCard";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { EmptyState } from "@/components/ui/states/EmptyState";
import { useMetricsData } from "./metrics/useMetricsData";

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

export const ClientMetrics = ({ metrics, isLoading, error }: ClientMetricsProps) => {
  const { data: metricsData, isLoading: metricsLoading, error: metricsError } = useMetricsData();

  if (error || metricsError) {
    console.error("Metrics error:", error || metricsError);
    return <ErrorState error={error || metricsError} />;
  }

  const displayMetrics = metrics || metricsData;
  const isLoadingState = isLoading || metricsLoading;

  if (isLoadingState) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[Shield, Activity, AlertTriangle, Clock, Users].map((Icon, i) => (
          <MetricCard
            key={i}
            title="Loading..."
            value="Loading..."
            icon={Icon}
            description="Loading..."
            isLoading={true}
          />
        ))}
      </div>
    );
  }

  if (!displayMetrics) {
    console.log("No metrics data available");
    return <EmptyState title="No Metrics Available" message="No metrics data is currently available." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
      <MetricCard
        title="Avg Processing Time"
        value={`${displayMetrics.avgProcessingTime ?? 0}ms`}
        icon={Clock}
        description="Average request processing time"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Concurrent Calls"
        value={displayMetrics.concurrentCalls ?? 0}
        icon={Users}
        description="Current concurrent API calls"
        isLoading={isLoadingState}
      />
    </div>
  );
};