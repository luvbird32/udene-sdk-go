import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Smartphone } from "lucide-react";
import { DeviceStatsChart } from "./device/DeviceStatsChart";
import { DeviceStatsList } from "./device/DeviceStatsList";
import { LoadingState } from "./shared/LoadingState";

/**
 * DeviceFingerprintMonitoring Component
 * 
 * Monitors and analyzes device fingerprints for fraud detection.
 * This component tracks various aspects of device usage:
 * 
 * Key Metrics:
 * 1. Device Count: Number of unique devices detected
 * 2. Usage Patterns: Frequency and timing of device appearances
 * 3. Risk Indicators:
 *    - Multiple accounts using same device
 *    - Rapid device switching
 *    - Known fraudulent device patterns
 *    - Suspicious configuration changes
 * 
 * Device Fingerprint Analysis:
 * - Browser and OS information
 * - Hardware specifications
 * - Network characteristics
 * - Canvas and WebGL fingerprints
 * - Font and plugin analysis
 * 
 * The data refreshes every 30 seconds to detect:
 * - Device spoofing attempts
 * - Automated fraud operations
 * - Account sharing or theft
 */
export const DeviceFingerprintMonitoring = () => {
  const { data: deviceStats, isLoading } = useQuery({
    queryKey: ["device-fingerprint-stats"],
    queryFn: async () => {
      console.log("Fetching device fingerprint stats...");
      const { data, error } = await supabase
        .from('device_fingerprints')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      const stats = (data || []).reduce((acc: Record<string, number>, curr) => {
        const date = new Date(curr.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([date, count]) => ({
        date,
        count
      }));
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return <LoadingState title="Device Fingerprint Analysis" />;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Device Fingerprint Analysis</h3>
        </div>
        <Badge variant="outline">
          {deviceStats?.length || 0} Devices Tracked
        </Badge>
      </div>

      <div className="h-[200px] mb-4">
        <DeviceStatsChart data={deviceStats || []} />
      </div>

      <DeviceStatsList stats={deviceStats || []} />
    </Card>
  );
};