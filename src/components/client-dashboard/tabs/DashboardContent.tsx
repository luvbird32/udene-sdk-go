/**
 * DashboardContent Component
 * 
 * Renders the main content area of the dashboard, organizing various monitoring
 * and analytics components in a grid layout.
 * 
 * Features:
 * - API credits display
 * - Client metrics visualization
 * - Multiple analytics sections
 * - Real-time monitoring components
 * - Security and risk analysis displays
 */
import { ApiCreditsDisplay } from "@/components/client-dashboard/ApiCreditsDisplay";
import { ClientMetrics } from "@/components/client-dashboard/ClientMetrics";
import { TransactionHistory } from "@/components/client-dashboard/transactions/TransactionHistory";
import { RiskOverview } from "@/components/client-dashboard/RiskOverview";
import { TrendAnalysis } from "@/components/client-dashboard/analytics/TrendAnalysis";
import { GeographicDistribution } from "@/components/client-dashboard/analytics/GeographicDistribution";
import { PeakTransactionTimes } from "@/components/client-dashboard/analytics/PeakTransactionTimes";
import { RiskDistribution } from "@/components/client-dashboard/analytics/RiskDistribution";
import { BusinessIntelligence } from "@/components/client-dashboard/analytics/BusinessIntelligence";
import { FlaggedDevices } from "@/components/monitoring/FlaggedDevices";
import { AffiliateMonitoring } from "@/components/client-dashboard/analytics/AffiliateMonitoring";
import { TrialAbuseMonitoring } from "@/components/client-dashboard/analytics/TrialAbuseMonitoring";
import { RewardProgramMonitoring } from "@/components/client-dashboard/analytics/RewardProgramMonitoring";
import { DeviceFingerprintMonitoring } from "@/components/client-dashboard/analytics/DeviceFingerprintMonitoring";
import { IdentityVerificationMonitoring } from "@/components/client-dashboard/analytics/IdentityVerificationMonitoring";
import { UserActivityMonitoring } from "@/components/client-dashboard/analytics/UserActivityMonitoring";

interface DashboardContentProps {
  /** Current metrics data */
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  /** Loading state for metrics data */
  metricsLoading?: boolean;
  /** Error state for metrics data */
  metricsError?: Error | null;
}

export const DashboardContent = ({ metrics, metricsLoading, metricsError }: DashboardContentProps) => {
  return (
    <div className="space-y-8">
      {/* API Credits Section */}
      <ApiCreditsDisplay />
      
      {/* Metrics Overview Section */}
      <ClientMetrics 
        metrics={metrics}
        isLoading={metricsLoading}
        error={metricsError}
      />
      
      {/* Analytics Grid - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrendAnalysis />
        <GeographicDistribution />
      </div>

      {/* Monitoring Grid - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AffiliateMonitoring />
        <RewardProgramMonitoring />
      </div>

      {/* Security Grid - Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrialAbuseMonitoring />
        <FlaggedDevices />
      </div>

      {/* Identity Grid - Fourth Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DeviceFingerprintMonitoring />
        <IdentityVerificationMonitoring />
      </div>

      {/* Activity Grid - Fifth Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserActivityMonitoring />
        <PeakTransactionTimes />
      </div>

      {/* Risk Analysis Grid - Sixth Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskDistribution />
        <BusinessIntelligence />
      </div>

      {/* Transaction Grid - Seventh Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionHistory />
        <RiskOverview />
      </div>
    </div>
  );
};