import { Card } from "@/components/ui/card";
import { Shield, Activity, AlertTriangle, Users, Zap, Server } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const RiskIndicators = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["exploitation-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_metrics')
        .select('*')
        .eq('metric_name', 'exploitation_patterns')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      return data?.[0];
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const indicators = [
    {
      title: "Concurrent Sessions",
      value: metrics?.concurrent_sessions || 0,
      icon: Users,
      description: "Active user sessions",
      alert: (metrics?.concurrent_sessions || 0) > 10
    },
    {
      title: "API Request Velocity",
      value: `${metrics?.api_request_velocity || 0}/hr`,
      icon: Activity,
      description: "API calls per hour",
      alert: (metrics?.api_request_velocity || 0) > 500
    },
    {
      title: "Device Patterns",
      value: metrics?.unusual_device_patterns ? "Suspicious" : "Normal",
      icon: Shield,
      description: "Device usage patterns",
      alert: metrics?.unusual_device_patterns
    },
    {
      title: "Resource Usage",
      value: metrics?.resource_usage_spikes ? "Spiking" : "Normal",
      icon: Server,
      description: "System resource utilization",
      alert: metrics?.resource_usage_spikes
    },
    {
      title: "Risk Score",
      value: `${metrics?.metric_value || 0}`,
      icon: AlertTriangle,
      description: "Overall risk assessment",
      alert: (metrics?.metric_value || 0) > 70
    },
    {
      title: "System Load",
      value: metrics?.resource_usage_spikes ? "High" : "Normal",
      icon: Zap,
      description: "Current system load",
      alert: metrics?.resource_usage_spikes
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">System Exploitation Monitoring</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indicators.map((indicator, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              indicator.alert ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{indicator.title}</h3>
              <indicator.icon
                className={`h-5 w-5 ${
                  indicator.alert ? 'text-red-500' : 'text-gray-500'
                }`}
              />
            </div>
            <p className="text-2xl font-bold mb-1">{indicator.value}</p>
            <p className="text-sm text-gray-500">{indicator.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};