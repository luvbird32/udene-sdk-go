import { ApiCreditsDisplay } from "@/components/client-dashboard/ApiCreditsDisplay";
import { ClientMetrics } from "@/components/client-dashboard/ClientMetrics";
import { TransactionHistory } from "@/components/client-dashboard/TransactionHistory";
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

interface DashboardOverviewProps {
  metrics: any;
  metricsLoading: boolean;
  metricsError: Error | null;
}

export const DashboardOverview = ({ metrics, metricsLoading, metricsError }: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
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
        <PeakTransactionTimes />
        <RiskDistribution />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BusinessIntelligence />
        <RiskOverview />
      </div>
      
      <TransactionHistory />
    </div>
  );
};