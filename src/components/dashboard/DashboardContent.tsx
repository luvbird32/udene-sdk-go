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
import ErrorBoundary from "@/components/ErrorBoundary";
import { MetricsSection } from "./MetricsSection";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  metrics, 
  metricsLoading, 
  metricsError 
}: DashboardContentProps) => {
  const { toast } = useToast();
  
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('metrics').select('*').limit(1);
        if (!error) {
          toast({
            title: "Connection Successful",
            description: "Your application is successfully connected to Udene",
          });
        }
      } catch (error) {
        console.error("Connection check failed:", error);
      }
    };

    checkConnection();
  }, [toast]);

  return (
    <div className="space-y-8">
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center space-x-2 text-green-600">
          <Check className="h-5 w-5" />
          <span className="font-medium">Successfully connected to Udene</span>
        </div>
      </Card>

      <ErrorBoundary>
        <ApiCreditsDisplay />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <MetricsSection 
          metrics={metrics}
          metricsLoading={metricsLoading}
          metricsError={metricsError}
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