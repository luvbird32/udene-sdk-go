import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/client-dashboard/tabs/DashboardHeader";
import { DashboardTabs } from "@/components/client-dashboard/tabs/DashboardTabs";
import { DashboardTabContent } from "@/components/client-dashboard/tabs/DashboardTabContent";
import { useClientMetrics } from "@/hooks/useClientMetrics";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ClientDashboard = () => {
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useClientMetrics();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkClientAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/client-auth');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'client') {
        toast({
          title: "Access Denied",
          description: "You need client access to view this dashboard",
          variant: "destructive"
        });
        navigate('/client-auth');
      }
    };

    checkClientAccess();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background p-6">
      <TooltipProvider>
        <DashboardHeader />
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
  );
};

export default ClientDashboard;