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
import { FraudPatterns } from "@/components/dashboard/FraudPatterns";
import { IPAddressMonitoring } from "@/components/monitoring/IPAddressMonitoring";

interface DashboardContentProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  metricsLoading?: boolean;
  metricsError?: Error | null;
}

export const DashboardContent = ({ 
  metrics = null, 
  metricsLoading = false, 
  metricsError = null 
}: DashboardContentProps) => {
  const safeMetrics = metrics ?? {
    riskScore: 0,
    totalTransactions: 0,
    flaggedTransactions: 0
  };

  return (
    <div className="space-y-8">
      <ApiCreditsDisplay />
      
      <ClientMetrics 
        metrics={safeMetrics}
        isLoading={metricsLoading}
        error={metricsError}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrendAnalysis />
        <GeographicDistribution />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FraudPatterns />
        <RiskDistribution />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IPAddressMonitoring />
        <FlaggedDevices />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AffiliateMonitoring />
        <RewardProgramMonitoring />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrialAbuseMonitoring />
        <DeviceFingerprintMonitoring />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IdentityVerificationMonitoring />
        <UserActivityMonitoring />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PeakTransactionTimes />
        <BusinessIntelligence />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionHistory />
        <RiskOverview />
      </div>
    </div>
  );
};