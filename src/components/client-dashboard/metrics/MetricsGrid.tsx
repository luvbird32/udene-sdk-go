import { Shield, Activity, AlertTriangle, Clock, Users } from "lucide-react";
import { MetricCard } from "./MetricCard";

interface MetricsGridProps {
  metrics: {
    riskScore?: number;
    totalTransactions?: number;
    flaggedTransactions?: number;
    avgProcessingTime?: number;
    concurrentCalls?: number;
  };
  isLoading: boolean;
}

const formatValue = (value?: number, suffix: string = '') => {
  if (value === undefined || isNaN(value)) return `0${suffix}`;
  return `${value}${suffix}`;
};

export const MetricsGrid = ({ metrics, isLoading }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <MetricCard
        title="Risk Score"
        value={formatValue(metrics?.riskScore, '%')}
        icon={Shield}
        description="Current risk assessment score"
        isLoading={isLoading}
      />
      <MetricCard
        title="Total Transactions"
        value={formatValue(metrics?.totalTransactions)}
        icon={Activity}
        description="Number of processed transactions"
        isLoading={isLoading}
      />
      <MetricCard
        title="Flagged Transactions"
        value={formatValue(metrics?.flaggedTransactions)}
        icon={AlertTriangle}
        description="Transactions requiring attention"
        isLoading={isLoading}
      />
      <MetricCard
        title="Avg Processing Time"
        value={formatValue(metrics?.avgProcessingTime, 'ms')}
        icon={Clock}
        description="Average transaction processing time"
        isLoading={isLoading}
      />
      <MetricCard
        title="Concurrent Calls"
        value={formatValue(metrics?.concurrentCalls)}
        icon={Users}
        description="Current concurrent API calls"
        isLoading={isLoading}
      />
    </div>
  );
};