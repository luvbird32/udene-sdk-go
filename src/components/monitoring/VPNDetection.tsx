import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { analyzeVPNRisk } from "@/utils/vpnDetection";

interface VPNDetectionProps {
  profileId?: string;
}

export const VPNDetection = ({ profileId }: VPNDetectionProps) => {
  const { toast } = useToast();

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
        if (profileId) {
          await supabase.from('user_activities').insert({
            profile_id: profileId,
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
  }, [profileId]);

  return null;
};