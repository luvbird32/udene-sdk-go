import { Card } from "@/components/ui/card";
import { Shield, Activity, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Props for the MetricCard component
 * @interface MetricCardProps
 * @property {string} title - The title of the metric card
 * @property {number | string} value - The value to display
 * @property {React.ElementType} icon - The icon component to display
 * @property {string} description - A description of the metric
 * @property {boolean} [isLoading] - Whether the card is in a loading state
 */
interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description: string;
  isLoading?: boolean;
}

/**
 * MetricCard component displays a single metric with an icon and loading state
 * @param {MetricCardProps} props - The props for the component
 * @returns {JSX.Element} A card displaying a metric with optional loading state
 */
const MetricCard = ({ title, value, icon: Icon, description, isLoading }: MetricCardProps) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {isLoading ? (
          <Skeleton className="h-8 w-24 mt-2" />
        ) : (
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        )}
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </div>
  </Card>
);

/**
 * Props for the ClientMetrics component
 * @interface ClientMetricsProps
 * @property {Object} [metrics] - The metrics data to display
 * @property {number} metrics.riskScore - The current risk assessment score
 * @property {number} metrics.totalTransactions - Total number of processed transactions
 * @property {number} metrics.flaggedTransactions - Number of transactions requiring attention
 * @property {boolean} isLoading - Whether the metrics are loading
 * @property {Error | null} error - Any error that occurred while loading metrics
 */
interface ClientMetricsProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  };
  isLoading: boolean;
  error: Error | null;
}

/**
 * ClientMetrics component displays key metrics for the client dashboard
 * @param {ClientMetricsProps} props - The props for the component
 * @returns {JSX.Element} A grid of metric cards showing key client metrics
 */
export const ClientMetrics = ({ metrics, isLoading, error }: ClientMetricsProps) => {
  if (error) {
    return (
      <Card className="p-6 border-destructive">
        <p className="text-destructive">Error loading metrics: {error.message}</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Risk Score"
        value={metrics?.riskScore ?? 0}
        icon={Shield}
        description="Current risk assessment score"
        isLoading={isLoading}
      />
      <MetricCard
        title="Total Transactions"
        value={metrics?.totalTransactions ?? 0}
        icon={Activity}
        description="Number of processed transactions"
        isLoading={isLoading}
      />
      <MetricCard
        title="Flagged Transactions"
        value={metrics?.flaggedTransactions ?? 0}
        icon={AlertTriangle}
        description="Transactions requiring attention"
        isLoading={isLoading}
      />
    </div>
  );
};