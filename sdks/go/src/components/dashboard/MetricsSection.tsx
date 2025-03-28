
/**
 * MetricsSection Component
 * 
 * Displays various metrics and analytics data in a structured layout.
 * Includes key metrics, health status, and detection metrics components.
 */
import { KeyMetrics } from "./KeyMetrics";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { DetectionMetrics } from "@/components/monitoring/DetectionMetrics";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";

interface MetricsSectionProps {
  metrics: any; // Dashboard metrics data
  metricsLoading: boolean; // Loading state indicator
  metricsError: Error | null; // Error state if metrics fetch fails
}

export const MetricsSection = ({ metrics, metricsLoading, metricsError }: MetricsSectionProps) => {
  // Render error alert if metrics fetch fails
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
      
      <ErrorBoundary>
        <KeyMetrics metrics={metrics} isLoading={metricsLoading} />
      </ErrorBoundary>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorBoundary>
          <HealthStatus />
        </ErrorBoundary>
        <ErrorBoundary>
          <DetectionMetrics />
        </ErrorBoundary>
      </div>
    </div>
  );
};
