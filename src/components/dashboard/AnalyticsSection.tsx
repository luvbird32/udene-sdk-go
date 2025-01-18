import { TrendAnalysis } from "@/components/client-dashboard/analytics/TrendAnalysis";
import { GeographicDistribution } from "@/components/client-dashboard/analytics/GeographicDistribution";
import { AffiliateMonitoring } from "@/components/client-dashboard/analytics/AffiliateMonitoring";
import { RewardProgramMonitoring } from "@/components/client-dashboard/analytics/RewardProgramMonitoring";
import { PeakTransactionTimes } from "@/components/client-dashboard/analytics/PeakTransactionTimes";
import { RiskDistribution } from "@/components/client-dashboard/analytics/RiskDistribution";
import ErrorBoundary from "@/components/ErrorBoundary";

export const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <TrendAnalysis />
        </ErrorBoundary>
        <ErrorBoundary>
          <GeographicDistribution />
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <AffiliateMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <RewardProgramMonitoring />
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <PeakTransactionTimes />
        </ErrorBoundary>
        <ErrorBoundary>
          <RiskDistribution />
        </ErrorBoundary>
      </div>
    </div>
  );
};