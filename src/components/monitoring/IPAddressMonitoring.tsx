import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertCircle, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IPActivity {
  ip_address: string;
  request_count: number;
  first_request_time: string;
  last_request_time: string;
  risk_score?: number;
  location?: string;
}

export const IPAddressMonitoring = () => {
  const { data: ipActivities, isLoading, error } = useQuery({
    queryKey: ["ip-monitoring"],
    queryFn: async () => {
      console.log("Fetching IP monitoring data...");
      const { data: activities, error } = await supabase
        .from('rate_limits')
        .select('*')
        .order('request_count', { ascending: false })
        .limit(50);

      if (error) throw error;

      return activities as IPActivity[];
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const getRiskLevel = (count: number) => {
    if (count > 1000) return "High";
    if (count > 500) return "Medium";
    return "Low";
  };

  const getRiskColor = (count: number) => {
    if (count > 1000) return "text-destructive";
    if (count > 500) return "text-yellow-500";
    return "text-green-500";
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading IP monitoring data...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load IP monitoring data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">IP Address Monitoring</h3>
      </div>

      <ScrollArea className="h-[400px] w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>Request Count</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>First Seen</TableHead>
              <TableHead>Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ipActivities?.map((activity) => (
              <TableRow key={activity.ip_address}>
                <TableCell className="font-medium">{activity.ip_address}</TableCell>
                <TableCell>{activity.request_count}</TableCell>
                <TableCell className={getRiskColor(activity.request_count)}>
                  {getRiskLevel(activity.request_count)}
                </TableCell>
                <TableCell>
                  {new Date(activity.first_request_time).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(activity.last_request_time).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
};