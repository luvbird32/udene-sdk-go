import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DeviceList } from "./DeviceList";

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

      <DeviceList devices={devices || []} />
    </Card>
  );
};