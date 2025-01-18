import { TransactionTrends } from "./TransactionTrends";
import { GeographicalDistribution } from "./GeographicalDistribution";
import { FraudPatterns } from "./FraudPatterns";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { PerformanceMetrics } from "@/components/monitoring/PerformanceMetrics";
import ErrorBoundary from "@/components/ErrorBoundary";

export const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ErrorBoundary>
          <TransactionTrends />
        </ErrorBoundary>
        <ErrorBoundary>
          <GeographicalDistribution />
        </ErrorBoundary>
        <ErrorBoundary>
          <FraudPatterns />
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorBoundary>
          <ErrorLog />
        </ErrorBoundary>
        <ErrorBoundary>
          <PerformanceMetrics />
        </ErrorBoundary>
      </div>
    </div>
  );
};