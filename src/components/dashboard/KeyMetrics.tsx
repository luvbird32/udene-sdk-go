import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface KeyMetricsProps {
  /** Current system metrics data */
  metrics: {
    activeUsers?: number;
    avgProcessingTime?: number;
    concurrentCalls?: number;
  };
  /** Loading state for metrics data */
  isLoading: boolean;
}

export const KeyMetrics = ({ metrics, isLoading }: KeyMetricsProps) => {
  // Get current user's profile to check role
  const { data: profile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return profile;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <Card className="animate-pulse h-24" />
        <Card className="animate-pulse h-24" />
        <Card className="animate-pulse h-24" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {profile?.role === 'admin' && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="text-2xl">{metrics.activeUsers ?? 0}</p>
        </Card>
      )}
      <Card className="p-4">
        <h3 className="text-lg font-semibold">Avg Processing Time</h3>
        <p className="text-2xl">{metrics.avgProcessingTime ?? 0} ms</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-lg font-semibold">Concurrent Calls</h3>
        <p className="text-2xl">{metrics.concurrentCalls ?? 0}</p>
      </Card>
    </div>
  );
};