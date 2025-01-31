import { Shield, Activity, AlertTriangle, Clock, Users } from "lucide-react";
import { useMetricsData } from "./metrics/useMetricsData";
import { MetricCard } from "@/components/ui/metrics/MetricCard";
import { EmptyMetrics } from "./metrics/EmptyMetrics";
import { MetricsError } from "./metrics/MetricsError";

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

const formatValue = (value?: number, suffix: string = '') => {
  if (value === undefined || isNaN(value)) return `0${suffix}`;
  return `${value}${suffix}`;
};

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
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <MetricCard
            key={i}
            title=""
            value=""
            icon={Shield}
            description=""
            isLoading={true}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <MetricsError error={error} />;
  }

  if (!displayMetrics) {
    return <EmptyMetrics />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <MetricCard
        title="Risk Score"
        value={formatValue(displayMetrics?.riskScore, '%')}
        icon={Shield}
        description="Current risk assessment score"
        isLoading={isLoading}
      />
      <MetricCard
        title="Total Transactions"
        value={formatValue(displayMetrics?.totalTransactions)}
        icon={Activity}
        description="Number of processed transactions"
        isLoading={isLoading}
      />
      <MetricCard
        title="Flagged Transactions"
        value={formatValue(displayMetrics?.flaggedTransactions)}
        icon={AlertTriangle}
        description="Transactions requiring attention"
        isLoading={isLoading}
      />
      <MetricCard
        title="Avg Processing Time"
        value={formatValue(displayMetrics?.avgProcessingTime, 'ms')}
        icon={Clock}
        description="Average transaction processing time"
        isLoading={isLoading}
      />
      <MetricCard
        title="Concurrent Calls"
        value={formatValue(displayMetrics?.concurrentCalls)}
        icon={Users}
        description="Current concurrent API calls"
        isLoading={isLoading}
      />
    </div>
  );
};