import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Database, Table, Activity, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const DatabaseSection = () => {
  const { data: dbMetrics } = useQuery({
    queryKey: ["database-metrics"],
    queryFn: async () => {
      console.log("Fetching database metrics...");
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('timestamp', { ascending: true })
        .limit(50);

      if (error) throw error;
      return data?.map(metric => ({
        timestamp: new Date(metric.timestamp).toLocaleTimeString(),
        value: metric.metric_value
      })) ?? [];
    },
    refetchInterval: 30000,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-green-500/20 bg-black/50">
          <div className="flex items-center space-x-3">
            <Database className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-green-400">Active Connections</p>
              <p className="text-xl font-semibold">42</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-green-500/20 bg-black/50">
          <div className="flex items-center space-x-3">
            <Table className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-green-400">Table Size</p>
              <p className="text-xl font-semibold">2.3 GB</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-green-500/20 bg-black/50">
          <div className="flex items-center space-x-3">
            <Activity className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-green-400">Queries/sec</p>
              <p className="text-xl font-semibold">156</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-green-500/20 bg-black/50">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-green-400">Slow Queries</p>
              <p className="text-xl font-semibold">2</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 border border-green-500/20 bg-black/50">
        <h3 className="text-lg font-semibold text-green-400 mb-4">Query Performance</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dbMetrics}>
              <XAxis 
                dataKey="timestamp" 
                stroke="#22c55e"
                fontSize={12}
              />
              <YAxis 
                stroke="#22c55e"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  color: '#22c55e'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};