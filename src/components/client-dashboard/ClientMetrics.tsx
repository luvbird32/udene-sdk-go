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

  // Helper function to format values and handle NaN/undefined
  const formatValue = (value: number | undefined, suffix: string = ''): string => {
    if (value === undefined || isNaN(value)) {
      return `0${suffix}`;
    }
    return `${value}${suffix}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <MetricCard
        title="Risk Score"
        value={formatValue(displayMetrics?.riskScore, '%')}
        icon={Shield}
        description="Current risk assessment score"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Total Transactions"
        value={formatValue(displayMetrics?.totalTransactions)}
        icon={Activity}
        description="Number of processed transactions"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Flagged Transactions"
        value={formatValue(displayMetrics?.flaggedTransactions)}
        icon={AlertTriangle}
        description="Transactions requiring attention"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Avg Processing Time"
        value={formatValue(displayMetrics?.avgProcessingTime, 'ms')}
        icon={Clock}
        description="Average transaction processing time"
        isLoading={isLoadingState}
      />
      <MetricCard
        title="Concurrent Calls"
        value={formatValue(displayMetrics?.concurrentCalls)}
        icon={Users}
        description="Current concurrent API calls"
        isLoading={isLoadingState}
      />
    </div>
  );
};