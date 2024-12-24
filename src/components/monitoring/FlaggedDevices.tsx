import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Globe, Monitor, Cpu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DeviceFingerprint {
  id: string;
  risk_score: number;
  is_suspicious: boolean;
  last_seen: string;
  network_info: {
    ip_address: string;
    [key: string]: any;
  };
  hardware_info: {
    platform: string;
    [key: string]: any;
  };
  device_fingerprint_history: Array<{
    id: string;
    changes: any;
  }> | null;
}

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
            <Card key={device.id} className="p-4 border-destructive/20">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Device ID: {device.id.slice(-8)}</span>
                  </div>
                  <Badge variant="destructive">
                    Risk Score: {device.risk_score}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{device.network_info.ip_address}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>IP Address</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">
                          {device.hardware_info.platform || 'Unknown Platform'}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Hardware Info</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Last seen: {new Date(device.last_seen).toLocaleString()}</p>
                  {device.device_fingerprint_history?.length > 0 && (
                    <p>Changes detected: {device.device_fingerprint_history.length}</p>
                  )}
                </div>
              </div>
            </Card>
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