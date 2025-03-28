
/**
 * ClientMetrics Component
 * 
 * Displays key performance metrics for client dashboard including risk scores, 
 * transaction data, and operational metrics. Handles loading states and error conditions
 * gracefully.
 * 
 * Features:
 * - Real-time metrics display
 * - Loading state management
 * - Error handling with user feedback
 * - Responsive grid layout
 */

import { Shield, Activity, AlertTriangle, Clock, Users } from "lucide-react";
import { MetricCard } from "./metrics/MetricCard";
import { MetricsError } from "./metrics/MetricsError";
import { EmptyMetrics } from "./metrics/EmptyMetrics";
import { useMetricsData } from "./metrics/useMetricsData";
import { useAuth } from "@/components/auth/AuthProvider";

/**
 * Props interface for the ClientMetrics component
 * @property {Object} metrics - Optional metrics data containing risk and transaction information
 * @property {boolean} isLoading - Flag indicating if metrics are being fetched
 * @property {Error} error - Error object if metrics fetching fails
 */
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
  // Get authentication context for user verification
  const { user } = useAuth();
  
  // Fetch metrics data using custom hook if not provided via props
  const { data: metricsData, isLoading: metricsLoading, error: metricsError } = useMetricsData();

  // Early return if no authenticated user
  if (!user) {
    console.error("No authenticated user found");
    return <MetricsError error={new Error("Please sign in to view metrics")} />;
  }

  // Handle error states - either from props or from data fetch
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

  // Show empty state if no metrics data available
  if (!displayMetrics) {
    console.log("No metrics data available");
    return <EmptyMetrics />;
  }

  // Render grid of metric cards with available data
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {/* Risk Score Metric */}
      <MetricCard
        title="Risk Score"
        value={`${displayMetrics?.riskScore ?? 0}%`}
        icon={Shield}
        description="Current risk assessment score"
        isLoading={isLoadingState}
      />
      {/* Total Transactions Metric */}
      <MetricCard
        title="Total Transactions"
        value={displayMetrics?.totalTransactions ?? 0}
        icon={Activity}
        description="Number of processed transactions"
        isLoading={isLoadingState}
      />
      {/* Flagged Transactions Metric */}
      <MetricCard
        title="Flagged Transactions"
        value={displayMetrics?.flaggedTransactions ?? 0}
        icon={AlertTriangle}
        description="Transactions requiring attention"
        isLoading={isLoadingState}
      />
      {/* Average Processing Time Metric */}
      <MetricCard
        title="Avg Processing Time"
        value={`${displayMetrics?.avgProcessingTime ?? 0}ms`}
        icon={Clock}
        description="Average transaction processing time"
        isLoading={isLoadingState}
      />
      {/* Concurrent Calls Metric */}
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
