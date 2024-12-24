import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DeviceCard } from "./device/DeviceCard";
import type { DeviceFingerprint } from "./types";

export const FlaggedDevices = () => {
  const { data: flaggedDevices, isLoading } = useQuery({
    queryKey: ["flagged-devices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('device_fingerprints')
        .select(`
          *,
          device_fingerprint_history(*)
        `)
        .eq('is_suspicious', true)
        .order('risk_score', { ascending: false });

      if (error) throw error;
      return data as DeviceFingerprint[];
    },
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Flagged Devices</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading flagged devices...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <h3 className="font-semibold">Flagged Devices</h3>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {flaggedDevices?.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}

          {(!flaggedDevices || flaggedDevices.length === 0) && (
            <div className="text-center text-muted-foreground py-8">
              No flagged devices found
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};