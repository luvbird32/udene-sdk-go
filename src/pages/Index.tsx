import { useToast } from "@/components/ui/use-toast";
import { Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { DevTools } from "@/components/developer/DevTools";
import { Link } from "react-router-dom";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ComplianceReporting } from "@/components/compliance/ComplianceReporting";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { useRealtimeSubscriptions } from "@/hooks/useRealtimeSubscriptions";

const Index = () => {
  const { toast } = useToast();
  
  // Move session timeout logic to a custom hook
  useSessionTimeout();
  
  // Move realtime subscriptions to a custom hook
  useRealtimeSubscriptions();

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

      const { data: recentTransactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('risk_score, is_fraudulent')
        .order('created_at', { ascending: false })
        .limit(100);

      if (transactionsError) throw transactionsError;

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

  return (
    <div className="min-h-screen bg-background p-6" role="main">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2" tabIndex={0}>
            Fraud Detection System
          </h1>
          <p className="text-muted-foreground" tabIndex={0}>
            Comprehensive monitoring, analysis, and documentation
          </p>
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
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="docs">API Documentation</TabsTrigger>
          <TabsTrigger value="devtools">Developer Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <DashboardContent 
            metrics={metrics}
            metricsLoading={metricsLoading}
            metricsError={metricsError}
          />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceReporting />
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