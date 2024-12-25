import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const DatabaseSection = () => {
  const { data: dbMetrics, isLoading, error } = useQuery({
    queryKey: ["database-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('database_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) throw error;

      return data;
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Database Metrics</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded" />
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Database Metrics</h3>
        <p className="text-red-500">Error loading metrics: {error.message}</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Database Metrics</h3>
      <div>
        <p>Current Connections: {dbMetrics?.[0]?.current_connections}</p>
        <p>Active Queries: {dbMetrics?.[0]?.active_queries}</p>
        <p>Cache Hit Ratio: {dbMetrics?.[0]?.cache_hit_ratio}</p>
      </div>
    </Card>
  );
};

export default DatabaseSection;
