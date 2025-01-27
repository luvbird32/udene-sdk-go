import { Shield, Activity, AlertTriangle, Clock, Users } from "lucide-react";
import { MetricCard } from "./metrics/MetricCard";
import { MetricsError } from "./metrics/MetricsError";
import { EmptyMetrics } from "./metrics/EmptyMetrics";
import { useMetricsData } from "./metrics/useMetricsData";
import { useAuth } from "@/components/auth/AuthProvider";

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
  const { user } = useAuth();
  const { data: metricsData, isLoading: metricsLoading, error: metricsError } = useMetricsData();

  // Check authentication first
  if (!user) {
    console.error("No authenticated user found");
    return <MetricsError error={new Error("Please sign in to view metrics")} />;
  }

  // Early return for error states
  if (error || metricsError) {
    console.error("Metrics error:", error || metricsError);
    return <MetricsError error={error || metricsError} />;
  }

  // Use provided metrics or fallback to fetched metrics
  const displayMetrics = metrics || metricsData;
  const isLoadingState = isLoading || metricsLoading;

  // Show loading state while data is being fetched
  if (isLoadingState) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <MetricCard
            key={i}
            title="Loading..."
            value="..."
            icon={Shield}
            description="Loading metric data"
            isLoading={true}
          />
        ))}
      </div>
    );
  }

  // Early return for empty state
  if (!displayMetrics) {
    console.log("No metrics data available");
    return <EmptyMetrics />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
      <MetricCard
        title="Avg Processing Time"
        value={`${displayMetrics?.avgProcessingTime ?? 0}ms`}
        icon={Clock}
        description="Average transaction processing time"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Concurrent Calls"
        value={displayMetrics?.concurrentCalls ?? 0}
        icon={Users}
        description="Current concurrent API calls"
        isLoading={isLoadingState}
      />
    </div>
  );
};