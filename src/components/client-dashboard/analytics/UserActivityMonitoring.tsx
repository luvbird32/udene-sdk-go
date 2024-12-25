import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export const UserActivityMonitoring = () => {
  const { data: activityData, isLoading } = useQuery({
    queryKey: ["user-activity-stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: activities, error } = await supabase
        .from('user_activities')
        .select('activity_type, created_at')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      // Group activities by date
      const groupedActivities = activities?.reduce((acc: Record<string, number>, curr) => {
        const date = new Date(curr.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(groupedActivities || {}).map(([date, count]) => ({
        date,
        count
      }));
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">User Activity Monitoring</h3>
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading activity data...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">User Activity Monitoring</h3>
        </div>
        <Badge variant="outline">Last 100 Activities</Badge>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};