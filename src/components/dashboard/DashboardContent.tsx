import { KeyMetrics } from "@/components/dashboard/KeyMetrics";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { DetectionMetrics } from "@/components/monitoring/DetectionMetrics";
import { TransactionTrends } from "@/components/dashboard/TransactionTrends";
import { GeographicalDistribution } from "@/components/dashboard/GeographicalDistribution";
import { FraudPatterns } from "@/components/dashboard/FraudPatterns";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { PerformanceMetrics } from "@/components/monitoring/PerformanceMetrics";
import { RiskFactorAnalysis } from "@/components/monitoring/RiskFactorAnalysis";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface DashboardContentProps {
  metrics: any;
  metricsLoading: boolean;
  metricsError: Error | null;
}

export const DashboardContent = ({ metrics, metricsLoading, metricsError }: DashboardContentProps) => {
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
    <div className="space-y-8">
      {metricsError && renderError(metricsError)}
      
      <KeyMetrics metrics={metrics} isLoading={metricsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthStatus />
        <DetectionMetrics />
      </div>

      <RiskFactorAnalysis />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TransactionTrends />
        <GeographicalDistribution />
        <FraudPatterns />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorLog />
        <PerformanceMetrics />
      </div>
    </div>
  );
};