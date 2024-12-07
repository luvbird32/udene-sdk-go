import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const PerformanceMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ["performance"],
    queryFn: async () => {
      console.log("Fetching performance metrics from Supabase...");
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('timestamp', { ascending: true })
        .limit(50);

      if (error) {
        console.error('Error fetching metrics:', error);
        throw error;
      }

      return data?.map(metric => ({
        timestamp: new Date(metric.timestamp).toLocaleTimeString(),
        responseTime: metric.metric_value
      })) ?? [];
    },
    refetchInterval: 10000,
  });

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Performance Metrics</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metrics ?? []}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="responseTime" 
              stroke="#8884d8" 
              name="Response Time (ms)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};