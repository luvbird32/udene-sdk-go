/**
 * DashboardContent Component
 * 
 * Main content area for the admin dashboard displaying various metrics,
 * monitoring sections, and real-time data.
 * 
 * Features:
 * - Real-time metrics display
 * - System health monitoring
 * - Fraud detection metrics
 * - User activity tracking
 * 
 * @component
 * @example
 * ```tsx
 * <DashboardContent 
 *   metrics={metricsData}
 *   metricsLoading={false}
 *   metricsError={null}
 * />
 * ```
 */
import { MetricsSection } from "./MetricsSection";
import { UserActivities } from "./UserActivities";

interface DashboardContentProps {
  /** Current system metrics data */
  metrics: any;
  /** Loading state for metrics data */
  metricsLoading: boolean;
  /** Error state for metrics data fetch */
  metricsError: Error | null;
}

export const DashboardContent = ({ metrics, metricsLoading, metricsError }: DashboardContentProps) => {
  return (
    <div className="space-y-6">
      <MetricsSection metrics={metrics} metricsLoading={metricsLoading} metricsError={metricsError} />
      <UserActivities />
    </div>
  );
};
