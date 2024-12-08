import { KeyMetrics } from "@/components/dashboard/KeyMetrics";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { DetectionMetrics } from "@/components/monitoring/DetectionMetrics";
import { TransactionTrends } from "@/components/dashboard/TransactionTrends";
import { GeographicalDistribution } from "@/components/dashboard/GeographicalDistribution";
import { FraudPatterns } from "@/components/dashboard/FraudPatterns";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { PerformanceMetrics } from "@/components/monitoring/PerformanceMetrics";
import { RiskFactorAnalysis } from "@/components/monitoring/RiskFactorAnalysis";
import { FeedbackManagement } from "@/components/monitoring/FeedbackManagement";
import { CustomerBehavior } from "@/components/monitoring/CustomerBehavior";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { analyzeVPNRisk } from "@/utils/vpnDetection";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface DashboardContentProps {
  metrics: any;
  metricsLoading: boolean;
  metricsError: Error | null;
}

export const DashboardContent = ({ metrics, metricsLoading, metricsError }: DashboardContentProps) => {
  const { toast } = useToast();
  
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

  // Add VPN detection
  useEffect(() => {
    const checkVPNUsage = async () => {
      const vpnRisk = await analyzeVPNRisk();
      
      if (vpnRisk.riskLevel !== 'low') {
        toast({
          title: "Security Alert",
          description: `Suspicious connection detected: ${vpnRisk.details.join(', ')}`,
          variant: "destructive",
        });

        // Log the VPN detection event
        if (profile?.id) {
          await supabase.from('user_activities').insert({
            profile_id: profile.id,
            activity_type: 'security_alert',
            description: 'VPN or proxy usage detected',
            metadata: {
              risk_level: vpnRisk.riskLevel,
              details: vpnRisk.details
            }
          });
        }
      }
    };

    checkVPNUsage();
  }, [profile?.id]);

  const renderError = (error: Error) => (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message || "An error occurred while loading the dashboard"}
      </AlertDescription>
    </Alert>
  );

  if (!profile) return null;

  return (
    <div className="space-y-8">
      {metricsError && renderError(metricsError)}
      
      <KeyMetrics metrics={metrics} isLoading={metricsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthStatus />
        <DetectionMetrics />
      </div>

      <CustomerBehavior />

      <RiskFactorAnalysis />

      <FeedbackManagement />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TransactionTrends />
        <GeographicalDistribution />
        <FraudPatterns />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorLog />
        <PerformanceMetrics />
      </div>
    </div>
  );
};