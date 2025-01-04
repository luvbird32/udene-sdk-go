import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { LoadingState } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { EmptyState } from "@/components/ui/states/EmptyState";

export const DetectionMetrics = () => {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ["client-detection-metrics"],
    queryFn: async () => {
      console.log("Fetching client detection metrics...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from('client_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) {
        console.error("Error fetching client metrics:", error);
        throw error;
      }

      console.log("Client metrics fetched:", data?.length || 0, "records");
      return data;
    },
    refetchInterval: 30000,
  });

  if (isLoading) return <LoadingState message="Loading your detection metrics..." />;
  if (error) return <ErrorState error={error} />;
  if (!metrics || metrics.length === 0) {
    return <EmptyState message="No detection metrics available yet" />;
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Your Detection Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={metrics}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="metric_value" 
            stroke="hsl(var(--primary))" 
            name="Detection Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};