import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

export const TrendAnalysis = () => {
  const { toast } = useToast();

  const { data: trends, isLoading, error } = useQuery({
    queryKey: ["transaction-trends"],
    queryFn: async () => {
      try {
        // First check if we have an authenticated session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw new Error("Authentication error");
        }

        if (!session) {
          throw new Error("No active session");
        }

        console.log("Fetching transaction trends...");
        const { data, error: metricsError } = await supabase
          .from('metrics')
          .select('*')
          .order('timestamp', { ascending: true })
          .limit(100);

        if (metricsError) {
          console.error("Metrics fetch error:", metricsError);
          throw metricsError;
        }

        // Group by date and calculate daily totals
        const dailyTotals = (data || []).reduce((acc: any, metric) => {
          const date = format(new Date(metric.timestamp), 'MMM d');
          if (!acc[date]) {
            acc[date] = {
              date,
              total: 0,
              count: 0
            };
          }
          acc[date].total += Number(metric.metric_value);
          acc[date].count += 1;
          return acc;
        }, {});

        return Object.values(dailyTotals);
      } catch (error) {
        console.error("Error in transaction trends query:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load transaction trends. Please try again later."
        });
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Transaction Trends</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading trends...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Transaction Trends</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-destructive">Failed to load trends. Please try again later.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Transaction Trends</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trends}>
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="total" 
              name="Total Amount" 
              stroke="#8884d8" 
              strokeWidth={2}
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="count" 
              name="Transaction Count" 
              stroke="#82ca9d" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};