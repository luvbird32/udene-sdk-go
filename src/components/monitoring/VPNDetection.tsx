import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Transaction, InteractionPatterns } from "@/types/risk";

interface VPNDetectionProps {
  profileId: string;
}

export const VPNDetection = ({ profileId }: VPNDetectionProps) => {
  const { data: vpnMetrics } = useQuery({
    queryKey: ["vpn-detection", profileId],
    queryFn: async () => {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      return (transactions as Transaction[])?.reduce((acc: any, tx: Transaction) => {
        const patterns = tx.interaction_patterns as InteractionPatterns;
        
        if (patterns?.vpn_detected) {
          acc.vpnDetections = (acc.vpnDetections || 0) + 1;
        }
        if (patterns?.device_count && patterns.device_count > 3) {
          acc.multiDeviceAccess = (acc.multiDeviceAccess || 0) + 1;
        }
        if (patterns?.odd_hours_activity) {
          acc.oddHoursActivity = (acc.oddHoursActivity || 0) + 1;
        }

        return acc;
      }, {});
    },
    refetchInterval: 30000,
  });

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">VPN Detection Metrics</h3>
      <div>
        <p>VPN Detections: {vpnMetrics?.vpnDetections || 0}</p>
        <p>Multi-Device Access: {vpnMetrics?.multiDeviceAccess || 0}</p>
        <p>Odd Hours Activity: {vpnMetrics?.oddHoursActivity || 0}</p>
      </div>
    </Card>
  );
};
