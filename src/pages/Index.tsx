import { useToast } from "@/components/ui/use-toast";
import { Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { PerformanceMetrics } from "@/components/monitoring/PerformanceMetrics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { DevTools } from "@/components/developer/DevTools";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { KeyMetrics } from "@/components/dashboard/KeyMetrics";
import { DetectionMetrics } from "@/components/monitoring/DetectionMetrics";
import { TransactionTrends } from "@/components/dashboard/TransactionTrends";
import { GeographicalDistribution } from "@/components/dashboard/GeographicalDistribution";
import { FraudPatterns } from "@/components/dashboard/FraudPatterns";

const Index = () => {
  const { toast } = useToast();

  // Fetch metrics from Supabase
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      console.log("Fetching metrics from Supabase...");
      const { data: metricsData, error: metricsError } = await supabase
        .from('metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);

      if (metricsError) throw metricsError;

      // Get recent transactions for risk calculation
      const { data: recentTransactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('risk_score, is_fraudulent')
        .order('created_at', { ascending: false })
        .limit(100);

      if (transactionsError) throw transactionsError;

      // Calculate average risk score
      const avgRiskScore = recentTransactions?.reduce((acc, t) => acc + (t.risk_score || 0), 0) / 
        (recentTransactions?.length || 1);

      return {
        riskScore: Math.round(avgRiskScore || 0),
        activeUsers: metricsData?.[0]?.metric_value || 0,
        avgProcessingTime: 35,
        concurrentCalls: metricsData?.[0]?.metric_value || 0
      };
    },
    refetchInterval: 3000,
    retry: 1,
  });

  // Subscribe to real-time fraud alerts
  useEffect(() => {
    console.log("Setting up real-time fraud alerts subscription...");
    const fraudAlertsChannel = supabase
      .channel('fraud_alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'fraud_alerts'
        },
        (payload) => {
          console.log("New fraud alert received:", payload);
          toast({
            title: "New Fraud Alert",
            description: payload.new.description,
            variant: "destructive",
          });
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up fraud alerts subscription...");
      supabase.removeChannel(fraudAlertsChannel);
    };
  }, [toast]);

  const renderError = (error: Error) => (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message || "An error occurred while loading the dashboard"}
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="min-h-screen bg-background p-6" role="main">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2" tabIndex={0}>Fraud Detection System</h1>
          <p className="text-muted-foreground" tabIndex={0}>Comprehensive monitoring, analysis, and documentation</p>
        </div>
        <Link 
          to="/settings" 
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </header>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="docs">API Documentation</TabsTrigger>
          <TabsTrigger value="devtools">Developer Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8">
          {metricsError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {metricsError.message || "An error occurred while loading the dashboard"}
              </AlertDescription>
            </Alert>
          )}
          
          <KeyMetrics metrics={metrics} isLoading={metricsLoading} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HealthStatus />
            <DetectionMetrics />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TransactionTrends />
            <GeographicalDistribution />
            <FraudPatterns />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ErrorLog />
            <PerformanceMetrics />
          </div>
        </TabsContent>

        <TabsContent value="docs">
          <ApiDocs />
        </TabsContent>

        <TabsContent value="devtools">
          <DevTools />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;