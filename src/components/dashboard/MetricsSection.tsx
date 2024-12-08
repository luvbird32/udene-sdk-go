import { KeyMetrics } from "./KeyMetrics";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { DetectionMetrics } from "@/components/monitoring/DetectionMetrics";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface MetricsSectionProps {
  metrics: any;
  metricsLoading: boolean;
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