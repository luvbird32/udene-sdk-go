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
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // Protect route from unauthenticated access
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      toast({
        title: "Authentication Required",
        description: "Please log in to access the dashboard.",
        variant: "destructive",
      });
    }
  }, [user, loading, navigate, toast]);

  // Implement session timeout handling
  useSessionTimeout();
  useRealtimeSubscriptions();

  // Fetch metrics with proper error handling and sanitization
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      try {
        console.log("Fetching metrics from Supabase...");
        const { data: metricsData, error: metricsError } = await supabase
          .from('metrics')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(1)
          .single();

        if (metricsError) {
          console.error("Error fetching metrics:", metricsError);
          throw metricsError;
        }

        // Sanitize data before returning
        return {
          riskScore: Number(DOMPurify.sanitize(String(metricsData?.metric_value ?? 0))),
          totalTransactions: Number(DOMPurify.sanitize(String(metricsData?.metric_value ?? 0))),
          flaggedTransactions: Number(DOMPurify.sanitize(String(metricsData?.metric_value ?? 0))),
          activeUsers: Number(DOMPurify.sanitize(String(metricsData?.active_users ?? 0))),
          avgProcessingTime: 35,
          concurrentCalls: Number(DOMPurify.sanitize(String(metricsData?.concurrent_calls ?? 0)))
        };
      } catch (error) {
        console.error("Metrics fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load metrics data. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: !!user, // Only fetch when user is authenticated
    refetchInterval: 3000,
    retry: 1,
  });

  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>;
  }

  // Prevent rendering if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 relative overflow-hidden" role="main">
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
  );
};

export default Dashboard;