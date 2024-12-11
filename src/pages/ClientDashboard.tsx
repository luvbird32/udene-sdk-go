import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClientMetrics } from "@/components/client-dashboard/ClientMetrics";
import { ApiCreditsDisplay } from "@/components/client-dashboard/ApiCreditsDisplay";
import { TransactionHistory } from "@/components/client-dashboard/TransactionHistory";
import { RiskOverview } from "@/components/client-dashboard/RiskOverview";
import { TrendAnalysis } from "@/components/client-dashboard/analytics/TrendAnalysis";
import { GeographicDistribution } from "@/components/client-dashboard/analytics/GeographicDistribution";
import { PeakTransactionTimes } from "@/components/client-dashboard/analytics/PeakTransactionTimes";
import { RiskDistribution } from "@/components/client-dashboard/analytics/RiskDistribution";
import { BusinessIntelligence } from "@/components/client-dashboard/analytics/BusinessIntelligence";
import { ReportManager } from "@/components/client-dashboard/reporting/ReportManager";
import { useToast } from "@/components/ui/use-toast";
import { Settings, Shield, Code, UserRound, Webhook, FileText, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { ClientApiKeyManager } from "@/components/client-dashboard/ClientApiKeyManager";
import { ClientProfile } from "@/components/client-dashboard/ClientProfile";
import { WebhookManager } from "@/components/client-dashboard/webhooks/WebhookManager";
import { TriggerManager } from "@/components/client-dashboard/triggers/TriggerManager";
import { ServiceManager } from "@/components/client-dashboard/services/ServiceManager";
import { ReferralFraudMonitoring } from "@/components/client-dashboard/analytics/ReferralFraudMonitoring";
import { RomanceScamMonitoring } from "@/components/client-dashboard/analytics/RomanceScamMonitoring";
import { RewardProgramMonitoring } from "@/components/client-dashboard/analytics/RewardProgramMonitoring";
import { AffiliateMonitoring } from "@/components/client-dashboard/analytics/AffiliateMonitoring";
import { TrialAbuseMonitoring } from "@/components/client-dashboard/analytics/TrialAbuseMonitoring";
import { FraudPatterns } from "@/components/dashboard/FraudPatterns";

const ClientDashboard = () => {
  const { toast } = useToast();

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["client-metrics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: recentTransactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('risk_score, is_fraudulent')
        .order('created_at', { ascending: false })
        .limit(100);

      if (transactionsError) throw transactionsError;

      const validTransactions = recentTransactions?.filter(t => t?.risk_score != null) ?? [];
      const avgRiskScore = validTransactions.length > 0
        ? validTransactions.reduce((acc, t) => acc + (t.risk_score ?? 0), 0) / validTransactions.length
        : 0;

      return {
        riskScore: Math.round(avgRiskScore),
        totalTransactions: validTransactions.length,
        flaggedTransactions: validTransactions.filter(t => t.is_fraudulent).length
      };
    },
    refetchInterval: 30000,
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Fraud Detection Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor your transaction security and risk metrics
          </p>
        </div>
        <div className="flex gap-4">
          <Link 
            to="/client-settings" 
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </header>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">
            <Shield className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="services">
            <Layers className="h-4 w-4 mr-2" />
            Services
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="api">
            <Code className="h-4 w-4 mr-2" />
            API & SDKs
          </TabsTrigger>
          <TabsTrigger value="webhooks">
            <Webhook className="h-4 w-4 mr-2" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="triggers">
            <Settings className="h-4 w-4 mr-2" />
            Triggers
          </TabsTrigger>
          <TabsTrigger value="profile">
            <UserRound className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
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

          <FraudPatterns />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReferralFraudMonitoring />
            <RomanceScamMonitoring />
            <RewardProgramMonitoring />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PeakTransactionTimes />
            <RiskDistribution />
          </div>

          <BusinessIntelligence />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TransactionHistory />
            <RiskOverview />
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <ServiceManager />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportManager />
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <ClientApiKeyManager />
          <ApiDocs />
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <WebhookManager />
        </TabsContent>

        <TabsContent value="triggers" className="space-y-6">
          <TriggerManager />
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <ClientProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
