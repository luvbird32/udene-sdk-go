import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "./shared/LoadingState";
import { DeviceHeader } from "./device/DeviceHeader";
import { DeviceAnalytics } from "./device/DeviceAnalytics";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export const DeviceFingerprintMonitoring = () => {
  const { toast } = useToast();
  const { data: deviceStats, isLoading, error } = useQuery({
    queryKey: ["device-fingerprint-stats"],
    queryFn: async () => {
      console.log("Fetching device fingerprint stats...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

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
    meta: {
      errorHandler: (error: Error) => {
        toast({
          title: "Error",
          description: "Failed to load device fingerprint data",
          variant: "destructive",
        });
      },
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return <LoadingState title="Device Fingerprint Analysis" />;
  }

  if (error) {
    return (
      <Card className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load device fingerprint data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!deviceStats || deviceStats.length === 0) {
    return (
      <Card className="p-4">
        <DeviceHeader deviceCount={0} />
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No device data available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <DeviceHeader deviceCount={deviceStats.length} />
      <DeviceAnalytics data={deviceStats} />
    </Card>
  );
};