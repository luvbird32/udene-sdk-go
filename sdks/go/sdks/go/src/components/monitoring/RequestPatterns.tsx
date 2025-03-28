import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";

export const RequestPatterns = () => {
  const { data: patterns, isLoading, error } = useQuery({
    queryKey: ["request-patterns"],
    queryFn: async () => {
      console.log("Fetching request patterns...");
      const { data: requests, error } = await supabase
        .from('rate_limits')
        .select('*')
        .order('last_request_time', { ascending: true });

      if (error) throw error;

      // Group requests by time intervals
      const groupedData = (requests || []).reduce((acc: any[], request) => {
        const timeKey = format(new Date(request.last_request_time), 'HH:mm');
        const existing = acc.find(item => item.time === timeKey);
        
        if (existing) {
          existing.count += request.request_count;
          if (request.request_count > existing.peak) {
            existing.peak = request.request_count;
          }
        } else {
          acc.push({
            time: timeKey,
            count: request.request_count,
            peak: request.request_count
          });
        }
        return acc;
      }, []);

      return groupedData;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-[300px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading request patterns...</p>
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
            Failed to load request patterns. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Request Patterns</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={patterns}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              width={40}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              name="Request Count"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="peak"
              name="Peak Requests"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};