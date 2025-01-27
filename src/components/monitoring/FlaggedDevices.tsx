import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle } from "lucide-react";

export const FlaggedDevices = () => {
  const { data: devices, isLoading } = useQuery({
    queryKey: ["flagged-devices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('device_fingerprints')
        .select('*, user_id')
        .eq('is_suspicious', true)
        .order('risk_score', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
    refetchInterval: 30000,
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-destructive" />
          <h2 className="text-lg font-semibold">Flagged Devices</h2>
        </div>
        <Badge variant="destructive">
          {devices?.length || 0} Suspicious Devices
        </Badge>
      </div>

      <ScrollArea className="h-[400px] w-full">
        {devices?.map((device) => (
          <div 
            key={device.id} 
            className="p-4 border rounded-lg mb-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="font-medium">Device ID: {device.id.slice(-8)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  User ID: {device.user_id}
                </p>
                <p className="text-sm text-muted-foreground">
                  Last seen: {new Date(device.last_seen).toLocaleString()}
                </p>
              </div>
              <Badge variant="destructive">
                Risk Score: {device.risk_score}
              </Badge>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Loading devices...</p>
          </div>
        )}

        {!isLoading && (!devices || devices.length === 0) && (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No flagged devices found</p>
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};