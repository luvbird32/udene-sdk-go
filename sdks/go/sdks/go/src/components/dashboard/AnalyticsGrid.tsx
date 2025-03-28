
import ErrorBoundary from "@/components/ErrorBoundary";
import { TrendAnalysis } from "@/components/client-dashboard/analytics/TrendAnalysis";
import { GeographicDistribution } from "@/components/client-dashboard/analytics/GeographicDistribution";
import { BiometricVerificationMonitoring } from "@/components/monitoring/BiometricVerificationMonitoring";
import { FlaggedDevices } from "@/components/monitoring/FlaggedDevices";
import { AffiliateMonitoring } from "@/components/client-dashboard/analytics/AffiliateMonitoring";
import { RewardProgramMonitoring } from "@/components/client-dashboard/analytics/RewardProgramMonitoring";
import { TrialAbuseMonitoring } from "@/components/client-dashboard/analytics/TrialAbuseMonitoring";
import { DeviceFingerprintMonitoring } from "@/components/client-dashboard/analytics/DeviceFingerprintMonitoring";
import { IdentityVerificationMonitoring } from "@/components/client-dashboard/analytics/IdentityVerificationMonitoring";
import { UserActivityMonitoring } from "@/components/client-dashboard/analytics/UserActivityMonitoring";
import { PeakTransactionTimes } from "@/components/client-dashboard/analytics/PeakTransactionTimes";
import { RiskDistribution } from "@/components/client-dashboard/analytics/RiskDistribution";
import { TransactionHistory } from "@/components/client-dashboard/transactions/TransactionHistory";
import { RiskOverview } from "@/components/client-dashboard/RiskOverview";
import { AnalyticsSection } from "./AnalyticsSection";
import { SecuritySection } from "./SecuritySection";
import { MonitoringSection } from "./MonitoringSection";

export const AnalyticsGrid = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <ErrorBoundary>
        <AnalyticsSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <SecuritySection />
      </ErrorBoundary>

      <ErrorBoundary>
        <MonitoringSection />
      </ErrorBoundary>

      <div className="space-y-6">
        <ErrorBoundary>
          <TransactionHistory />
        </ErrorBoundary>
        <ErrorBoundary>
          <RiskOverview />
        </ErrorBoundary>
      </div>
    </div>
  );
};
