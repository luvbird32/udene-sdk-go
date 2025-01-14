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
import { API_CONFIG } from "@/config/api";

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

      return {
        activeUsers: metricsData?.[0]?.metric_value ?? 0,
        avgProcessingTime: 35,
        concurrentCalls: metricsData?.[0]?.metric_value ?? 0
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

  // Add proper error handling for rate limits query
  const { data: rateLimits } = useQuery({
    queryKey: ["rate-limits"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rate_limits')
        .select('*')
        .order('last_request_time', { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching rate limits:", error);
        throw error;
      }

      // Return default values if no data
      return {
        currentRate: data?.[0]?.request_count ?? 0,
        limit: 100,
        remaining: 100 - (data?.[0]?.request_count ?? 0)
      };
    },
    retry: 2,
    meta: {
      errorHandler: (error: Error) => {
        console.error("Rate limits fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load rate limits",
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