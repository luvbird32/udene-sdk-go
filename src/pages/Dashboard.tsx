import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs } from "@/components/ui/tabs";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { useRealtimeSubscriptions } from "@/hooks/useRealtimeSubscriptions";
import { DashboardHeader } from "@/components/client-dashboard/tabs/DashboardHeader";
import { MatrixBackground } from "@/components/dashboard/background/MatrixBackground";
import { DashboardTabs } from "@/components/client-dashboard/tabs/DashboardTabs";
import { DashboardTabContent } from "@/components/client-dashboard/tabs/DashboardTabContent";

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

      const defaultMetrics = {
        riskScore: 0,
        totalTransactions: 0,
        flaggedTransactions: 0,
        avgProcessingTime: 35,
        concurrentCalls: 0
      };

      if (!metricsData || metricsData.length === 0) {
        return defaultMetrics;
      }

      return {
        ...defaultMetrics,
        ...metricsData[0]
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