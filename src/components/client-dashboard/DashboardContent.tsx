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
import { ReferralFraudMonitoring } from "@/components/client-dashboard/analytics/ReferralFraudMonitoring";
import { IPAddressMonitoring } from "@/components/monitoring/IPAddressMonitoring";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DashboardContentProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  metricsLoading?: boolean;
  metricsError?: Error | null;
}

export const DashboardContent = ({ metrics, metricsLoading, metricsError }: DashboardContentProps) => {
  const { data: user, isLoading: userLoading } = useCurrentUser();

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Please log in to view the dashboard
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <ErrorBoundary>
        <ApiCreditsDisplay />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <ClientMetrics 
          metrics={metrics}
          isLoading={metricsLoading}
          error={metricsError}
        />
      </ErrorBoundary>
      
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
          <TrialAbuseMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <ReferralFraudMonitoring />
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <IPAddressMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <FlaggedDevices />
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <DeviceFingerprintMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <IdentityVerificationMonitoring />
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <UserActivityMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <PeakTransactionTimes />
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <RiskDistribution />
        </ErrorBoundary>
        <ErrorBoundary>
          <BusinessIntelligence />
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
    </div>
  );
};