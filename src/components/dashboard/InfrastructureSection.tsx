import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { PerformanceMetrics } from "@/components/monitoring/PerformanceMetrics";
import { Server, Cpu, HardDrive, Network } from "lucide-react";

export const InfrastructureSection = () => {
  const { data: resourceMetrics } = useQuery({
    queryKey: ["resource-metrics"],
    queryFn: async () => {
      console.log("Fetching resource metrics...");
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) throw error;
      return data?.[0] ?? null;
    },
    refetchInterval: 30000,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HealthStatus />
        <PerformanceMetrics />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-green-500/20 bg-black/50">
          <div className="flex items-center space-x-3">
            <Server className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-green-400">Server Load</p>
              <p className="text-xl font-semibold">{resourceMetrics?.metric_value ?? 0}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-green-500/20 bg-black/50">
          <div className="flex items-center space-x-3">
            <Cpu className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-green-400">CPU Usage</p>
              <p className="text-xl font-semibold">{resourceMetrics?.metric_value ?? 0}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-green-500/20 bg-black/50">
          <div className="flex items-center space-x-3">
            <HardDrive className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-green-400">Storage</p>
              <p className="text-xl font-semibold">{resourceMetrics?.metric_value ?? 0}GB</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-green-500/20 bg-black/50">
          <div className="flex items-center space-x-3">
            <Network className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-green-400">Network</p>
              <p className="text-xl font-semibold">{resourceMetrics?.metric_value ?? 0}Mbps</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};