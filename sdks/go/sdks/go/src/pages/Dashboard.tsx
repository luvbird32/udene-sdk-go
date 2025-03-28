
/**
 * Main Dashboard Page Component
 * 
 * Primary dashboard interface that provides:
 * - Real-time metrics and analytics visualization
 * - Monitoring sections for security and performance
 * - Session management and timeout handling
 * - Realtime data subscriptions
 * - Project selection and management
 * 
 * Features:
 * - Automatic metrics refresh every 3 seconds
 * - Error handling with toast notifications
 * - Session validation and management
 * - Responsive layout with matrix background effect
 * 
 * @component
 */
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
import { WelcomeGuide } from "@/components/dashboard/WelcomeGuide";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { toast } = useToast();
  const [showWelcome, setShowWelcome] = useState(false);
  
  // Initialize session timeout and realtime subscription hooks
  useSessionTimeout();
  useRealtimeSubscriptions();

  useEffect(() => {
    // Check if this is the first visit
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      localStorage.setItem("hasSeenWelcome", "true");
    }
  }, []);

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

        // Transform and return metrics with default values if data is missing
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
        // Re-throw the error to be handled by the error boundary
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
    <div className="min-h-screen text-foreground p-6 relative overflow-hidden" data-route="dashboard" role="main">
      <MatrixBackground />
      <div className="relative z-10">
        <TooltipProvider>
          <DashboardHeader />
          <ProjectSelector />
          {showWelcome && <WelcomeGuide />}
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
  );
};

export default Dashboard;
