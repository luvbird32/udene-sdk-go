import { Shield, Activity, AlertTriangle, Clock, Users } from "lucide-react";
import { useMetricsData } from "./metrics/useMetricsData";
import { MetricCard } from "@/components/ui/metrics/MetricCard";
import { EmptyMetrics } from "./metrics/EmptyMetrics";
import { MetricsError } from "./metrics/MetricsError";

interface ClientMetricsProps {
  isLoadingState?: boolean;
}

export const ClientMetrics = ({ isLoadingState = false }: ClientMetricsProps) => {
  const { data: displayMetrics, isLoading, error } = useMetricsData();

  if (isLoading || isLoadingState) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-card rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <MetricsError />;
  }

  if (!displayMetrics) {
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