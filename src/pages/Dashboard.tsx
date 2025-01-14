import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs } from "@/components/ui/tabs";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { useRealtimeSubscriptions } from "@/hooks/useRealtimeSubscriptions";
import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { MatrixBackground } from "@/components/dashboard/background/MatrixBackground";
import { DashboardTabs } from "@/components/dashboard/tabs/DashboardTabs";
import { DashboardTabContent } from "@/components/dashboard/tabs/DashboardTabContent";

const Dashboard = () => {
  const { toast } = useToast();
  
  useSessionTimeout();
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

      if (metricsError) {
        console.error("Error fetching metrics:", metricsError);
        throw metricsError;
      }

      // Combine metrics from different sources
      const { data: transactionData, error: transactionError } = await supabase
        .from('transactions')
        .select('risk_score, is_fraudulent')
        .limit(100);

      if (transactionError) {
        console.error("Error fetching transactions:", transactionError);
        throw transactionError;
      }

      const avgRiskScore = transactionData?.length 
        ? transactionData.reduce((acc, t) => acc + (t.risk_score || 0), 0) / transactionData.length 
        : 0;

      return {
        riskScore: Math.round(avgRiskScore),
        totalTransactions: transactionData?.length ?? 0,
        flaggedTransactions: transactionData?.filter(t => t.is_fraudulent).length ?? 0,
        avgProcessingTime: 35, // Keep existing value
        concurrentCalls: metricsData?.[0]?.metric_value ?? 0,
        activeUsers: metricsData?.[0]?.metric_value ?? 0
      };
    },
    refetchInterval: 3000,
    retry: 1,
    meta: {
      errorHandler: (error: Error) => {
        console.error("Metrics fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load metrics data",
          variant: "destructive",
        });
      },
    },
  });

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 relative overflow-hidden" role="main">
      <MatrixBackground />
      <DashboardHeader />

      <div className="relative z-10">
        <Tabs defaultValue="dashboard" className="space-y-4">
          <DashboardTabs />
          <DashboardTabContent 
            metrics={metrics}
            metricsLoading={metricsLoading}
            metricsError={metricsError}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;