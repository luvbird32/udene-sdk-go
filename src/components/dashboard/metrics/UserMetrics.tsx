/**
 * UserMetrics Component
 * 
 * Displays key performance metrics in a grid layout. Shows different metrics
 * based on user role (admin sees additional metrics). Handles loading states
 * and responsive layout.
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "@/components/ui/metrics/MetricCard";
import { Users, UserPlus, UserCheck, Clock } from "lucide-react";

interface UserMetricsData {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  avgSessionDuration: number;
}

export const UserMetrics = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["user-metrics"],
    queryFn: async (): Promise<UserMetricsData> => {
      console.log("Fetching user metrics...");
      const now = new Date();
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

      // Get total users
      const { count: totalUsers, error: totalError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (totalError) {
        console.error("Error fetching total users:", totalError);
        throw totalError;
      }

      // Get active users (logged in within last 30 days)
      const { count: activeUsers, error: activeError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('last_login', thirtyDaysAgo.toISOString());

      if (activeError) {
        console.error("Error fetching active users:", activeError);
        throw activeError;
      }

      // Get new users in last 30 days
      const { count: newUsers, error: newError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      if (newError) {
        console.error("Error fetching new users:", newError);
        throw newError;
      }

      // Calculate average session duration from metrics table
      const { data: sessionData, error: sessionError } = await supabase
        .from('metrics')
        .select('metric_value')
        .eq('metric_name', 'avg_session_duration')
        .order('timestamp', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (sessionError) {
        console.error("Error fetching session duration:", sessionError);
        throw sessionError;
      }

      return {
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        newUsers: newUsers || 0,
        avgSessionDuration: sessionData?.metric_value || 0
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Users"
        value={metrics?.totalUsers.toString() || "0"}
        icon={Users}
        description="Total registered users"
        isLoading={isLoading}
      />
      <MetricCard
        title="Active Users"
        value={metrics?.activeUsers.toString() || "0"}
        icon={UserCheck}
        description="Active users in last 30 days"
        isLoading={isLoading}
      />
      <MetricCard
        title="New Users"
        value={metrics?.newUsers.toString() || "0"}
        icon={UserPlus}
        description="New registrations in last 30 days"
        isLoading={isLoading}
      />
      <MetricCard
        title="Avg Session Duration"
        value={`${Math.round(metrics?.avgSessionDuration || 0)}m`}
        icon={Clock}
        description="Average user session length"
        isLoading={isLoading}
      />
    </div>
  );
};