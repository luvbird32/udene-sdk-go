
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Shield, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface IPActivity {
  ip_address: string;
  request_count: number;
  first_request_time: string;
  last_request_time: string;
}

export const IPAddressMonitoring = () => {
  const { data: ipActivities, isLoading } = useQuery({
    queryKey: ["ip-monitoring"],
    queryFn: async () => {
      console.log("Fetching IP monitoring data...");
      const { data, error } = await supabase
        .from('visitor_analytics')
        .select('*')
        .order('visit_count', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const getRiskLevel = (count: number) => {
    if (count > 1000) return "High";
    if (count > 500) return "Medium";
    return "Low";
  };

  const getRiskColor = (count: number) => {
    if (count > 1000) return "destructive";
    if (count > 500) return "warning";
    return "secondary";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">IP Address Monitoring</h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            <p className="text-sm text-muted-foreground">Loading IP monitoring data...</p>
          </div>
        </div>
      ) : (
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Visit Count</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>First Seen</TableHead>
                <TableHead>Last Seen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ipActivities?.map((activity) => (
                <TableRow key={activity.ip_address}>
                  <TableCell className="font-medium">{activity.ip_address}</TableCell>
                  <TableCell>{activity.visit_count}</TableCell>
                  <TableCell>
                    <Badge variant={getRiskColor(activity.visit_count)}>
                      {getRiskLevel(activity.visit_count)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(activity.first_visit_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(activity.last_visit_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      )}
    </Card>
  );
};
