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
  const { 
    data: metricsData, 
    isLoading: metricsLoading, 
    error: metricsError 
  } = useMetricsData();

  // Handle error states
  if (error || metricsError) {
    const displayError = error || metricsError;
    console.error("Metrics error:", displayError);
    return <ErrorState error={displayError} />;
  }

  // Use provided metrics or fallback to fetched metrics
  const displayMetrics = metrics || metricsData;
  const isLoadingState = isLoading || metricsLoading;

  // Handle loading state
  if (isLoadingState) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <MetricCard
            key={index}
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

  // Handle empty state
  if (!displayMetrics) {
    return <EmptyState 
      title="No Metrics Available" 
      message="No metrics data is currently available." 
    />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Risk Score"
        value={`${displayMetrics.riskScore}%`}
        icon={Shield}
        description="Current risk assessment score"
        isLoading={false}
      />
      <MetricCard
        title="Total Transactions"
        value={displayMetrics.totalTransactions}
        icon={Activity}
        description="Number of processed transactions"
        isLoading={false}
      />
      <MetricCard
        title="Flagged Transactions"
        value={displayMetrics.flaggedTransactions}
        icon={AlertTriangle}
        description="Transactions requiring attention"
        isLoading={false}
      />
    </div>
  );
};