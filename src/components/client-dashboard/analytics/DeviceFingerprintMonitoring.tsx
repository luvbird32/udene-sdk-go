import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smartphone, Shield, AlertTriangle } from "lucide-react";

export const DeviceFingerprintMonitoring = () => {
  const { data: deviceStats, isLoading } = useQuery({
    queryKey: ["device-fingerprint-stats"],
    queryFn: async () => {
      console.log("Fetching device fingerprint stats...");
      const { data, error } = await supabase
        .from('device_fingerprints')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      const stats = (data || []).reduce((acc: any, curr) => {
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
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Device Fingerprint Analysis</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading device data...</p>
        </div>
      </Card>
    );
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
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={deviceStats}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ScrollArea className="h-[100px]">
        <div className="space-y-2">
          {deviceStats?.slice(0, 3).map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <span className="text-sm">{stat.date}</span>
              <span className="text-sm font-medium">{stat.count} devices</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};