import { useToast } from "@/components/ui/use-toast";
import { Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { DevTools } from "@/components/developer/DevTools";
import { Link, useNavigate } from "react-router-dom";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let lastActivity = Date.now();
    let timeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
      lastActivity = Date.now();
    };

    const checkTimeout = () => {
      const now = Date.now();
      if (now - lastActivity >= SESSION_TIMEOUT) {
        // Session expired
        supabase.auth.signOut();
        navigate('/login');
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive"
        });
      }
    };

    // Set up activity listeners
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, resetTimeout);
    });

    // Check session every minute
    timeoutId = setInterval(checkTimeout, 60000);

    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetTimeout);
      });
      clearInterval(timeoutId);
    };
  }, [navigate, toast]);

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

        <TabsContent value="dashboard">
          <DashboardContent 
            metrics={metrics}
            metricsLoading={metricsLoading}
            metricsError={metricsError}
          />
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
