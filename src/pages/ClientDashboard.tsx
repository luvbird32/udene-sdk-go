import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClientMetrics } from "@/components/client-dashboard/ClientMetrics";
import { TransactionHistory } from "@/components/client-dashboard/TransactionHistory";
import { RiskOverview } from "@/components/client-dashboard/RiskOverview";
import { useToast } from "@/components/ui/use-toast";
import { Settings, Shield, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { DevTools } from "@/components/developer/DevTools";

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

      // Calculate average risk score
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
      {/* Header */}
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

      {/* Main Content */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">
            <Shield className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="api">
            <Code className="h-4 w-4 mr-2" />
            API & SDKs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <ClientMetrics 
            metrics={metrics}
            isLoading={metricsLoading}
            error={metricsError}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TransactionHistory />
            <RiskOverview />
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <DevTools />
          <ApiDocs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;