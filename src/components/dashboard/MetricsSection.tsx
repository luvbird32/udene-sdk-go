/**
 * MetricsSection Component
 * 
 * Displays key system metrics and health indicators in the admin dashboard.
 * Includes various monitoring components and real-time status updates.
 * 
 * Features:
 * - Key performance metrics
 * - System health status
 * - Detection metrics visualization
 * - Error state handling
 * 
 * @component
 * @example
 * ```tsx
 * <MetricsSection
 *   metrics={metricsData}
 *   metricsLoading={false}
 *   metricsError={null}
 * />
 * ```
 */
import { KeyMetrics } from "./KeyMetrics";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { DetectionMetrics } from "@/components/monitoring/DetectionMetrics";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface MetricsSectionProps {
  /** Current system metrics data */
  metrics: any;
  /** Loading state for metrics data */
  metricsLoading: boolean;
  /** Error state for metrics data fetch */
  metricsError: Error | null;
}

export const MetricsSection = ({ metrics, metricsLoading, metricsError }: MetricsSectionProps) => {
  const renderError = (error: Error) => (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message || "An error occurred while loading the dashboard"}
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="space-y-6">
      {metricsError && renderError(metricsError)}
      
      <KeyMetrics metrics={metrics} isLoading={metricsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthStatus />
        <DetectionMetrics />
      </div>
    </div>
  );
};