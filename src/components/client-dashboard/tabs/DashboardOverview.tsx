
/**
 * DashboardOverview Component
 * 
 * Main overview dashboard component that presents comprehensive client analytics and monitoring:
 * - API usage and credit monitoring
 * - Key client metrics and performance indicators
 * - Geographic and trend analysis visualizations
 * - Fraud detection and risk monitoring sections
 * - Business intelligence and analytics
 * 
 * Displays data in a responsive grid layout with various monitoring widgets,
 * handling loading states and error scenarios appropriately.
 * 
 * @component
 * @example
 * ```tsx
 * <DashboardOverview 
 *   metrics={clientMetrics}
 *   metricsLoading={false}
 *   metricsError={null}
 * />
 * ```
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

/**
 * Props interface for the DashboardOverview component
 * @property {Object} metrics - Optional metrics data containing risk scores and transaction counts
 * @property {boolean} metricsLoading - Flag indicating if metrics data is being loaded
 * @property {Error} metricsError - Error object if metrics fetching fails
 */
interface DashboardOverviewProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  metricsLoading?: boolean;
  metricsError?: Error | null;
}

export const DashboardOverview = ({ metrics, metricsLoading, metricsError }: DashboardOverviewProps) => {
  return (
    <div className="space-y-8">
      <ApiCreditsDisplay />
      
      <ClientMetrics 
        metrics={metrics}
        isLoading={metricsLoading}
        error={metricsError}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrendAnalysis />
        <GeographicDistribution />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AffiliateMonitoring />
        <RewardProgramMonitoring />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrialAbuseMonitoring />
        <FlaggedDevices />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DeviceFingerprintMonitoring />
        <IdentityVerificationMonitoring />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserActivityMonitoring />
        <PeakTransactionTimes />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskDistribution />
        <BusinessIntelligence />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionHistory />
        <RiskOverview />
      </div>
    </div>
  );
};
