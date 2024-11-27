import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";

export const PerformanceMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ["performance"],
    queryFn: async () => {
      const response = await fetch("/api/v1/performance");
      return response.json();
    },
    refetchInterval: 10000,
  });

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Performance Metrics</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metrics?.data ?? []}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="responseTime" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};