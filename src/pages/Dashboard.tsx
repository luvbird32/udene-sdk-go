import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs } from "@/components/ui/tabs";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { useRealtimeSubscriptions } from "@/hooks/useRealtimeSubscriptions";
import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { MatrixBackground } from "@/components/dashboard/background/MatrixBackground";
import { DashboardTabs } from "@/components/client-dashboard/tabs/DashboardTabs";
import { DashboardTabContent } from "@/components/client-dashboard/tabs/DashboardTabContent";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProjectSelector } from "@/components/dashboard/ProjectSelector";
import { ProjectProvider } from "@/contexts/ProjectContext";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Initialize session timeout and realtime subscription hooks
  useSessionTimeout();
  useRealtimeSubscriptions();

  // Fetch dashboard metrics with automatic refetching every 3 seconds
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      try {
        console.log("Checking auth state...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw new Error("Authentication error - please sign in again");
        }

        if (!session) {
          console.error("No active session");
          throw new Error("No active session - please sign in");
        }

        console.log("Fetching metrics from Supabase...");
        const { data: metricsData, error: metricsError } = await supabase
          .from('metrics')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (metricsError) {
          console.error("Error fetching metrics:", metricsError);
          throw metricsError;
        }

        return {
          riskScore: metricsData?.metric_value ?? 0,
          totalTransactions: metricsData?.metric_value ?? 0,
          flaggedTransactions: metricsData?.metric_value ?? 0,
          activeUsers: metricsData?.active_users ?? 0,
          avgProcessingTime: metricsData?.avg_processing_time ?? 35,
          concurrentCalls: metricsData?.concurrent_calls ?? 0
        };
      } catch (error) {
        console.error("Error in metrics query:", error);
        throw error;
      }
    },
    refetchInterval: 3000,
    retry: 1,
    meta: {
      errorHandler: (error: Error) => {
        console.error("Metrics fetch error:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load metrics data",
          variant: "destructive",
        });
      },
    },
  });

  return (
    <ProjectProvider>
      <div className="min-h-screen text-foreground p-6 relative overflow-hidden" data-route="dashboard" role="main">
        <MatrixBackground />
        <div className="relative z-10">
          <TooltipProvider>
            <DashboardHeader />
            <ProjectSelector />
            <Tabs defaultValue="dashboard" className="space-y-6">
              <DashboardTabs />
              <DashboardTabContent 
                metrics={metrics}
                metricsLoading={metricsLoading}
                metricsError={metricsError}
              />
            </Tabs>
          </TooltipProvider>
        </div>
      </div>
    </ProjectProvider>
  );
};

export default Dashboard;