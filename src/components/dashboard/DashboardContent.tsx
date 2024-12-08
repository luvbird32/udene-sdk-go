import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VPNDetection } from "@/components/monitoring/VPNDetection";
import { MetricsSection } from "./MetricsSection";
import { MonitoringSection } from "./MonitoringSection";
import { AnalyticsSection } from "./AnalyticsSection";

interface DashboardContentProps {
  metrics: any;
  metricsLoading: boolean;
  metricsError: Error | null;
}

export const DashboardContent = ({ metrics, metricsLoading, metricsError }: DashboardContentProps) => {
  const { data: profile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return profile;
    }
  });

  if (!profile) return null;

  return (
    <div className="space-y-8">
      <VPNDetection profileId={profile.id} />
      
      <MetricsSection 
        metrics={metrics}
        metricsLoading={metricsLoading}
        metricsError={metricsError}
      />

      <MonitoringSection />

      <AnalyticsSection />
    </div>
  );
};