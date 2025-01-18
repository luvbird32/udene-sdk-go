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

export const AnalyticsGrid = () => {
  return (
    <>
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
          <BiometricVerificationMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <FlaggedDevices />
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
          <TrialAbuseMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <DeviceFingerprintMonitoring />
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <IdentityVerificationMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <UserActivityMonitoring />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <TransactionHistory />
        </ErrorBoundary>
        <ErrorBoundary>
          <RiskOverview />
        </ErrorBoundary>
      </div>
    </>
  );
};