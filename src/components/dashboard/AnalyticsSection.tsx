import { TransactionTrends } from "./TransactionTrends";
import { GeographicalDistribution } from "./GeographicalDistribution";
import { FraudPatterns } from "@/components/client-dashboard/fraud/FraudPatterns";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { PerformanceMetrics } from "@/components/monitoring/PerformanceMetrics";

export const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
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