import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const UserActivityMonitoring = () => {
  const { data: activityStats, isLoading } = useQuery({
    queryKey: ["user-activity-stats"],
    queryFn: async () => {
      console.log("Fetching user activity stats...");
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      const stats = (data || []).reduce((acc: any, curr) => {
        acc[curr.activity_type] = (acc[curr.activity_type] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([type, count]) => ({
        type,
        count
      }));
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">User Activity Analysis</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading activity data...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">User Activity Analysis</h3>
        </div>
        <Badge variant="outline">
          {activityStats?.reduce((acc: number, curr: any) => acc + curr.count, 0) || 0} Activities
        </Badge>
      </div>

      <div className="h-[200px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityStats}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ScrollArea className="h-[100px]">
        <div className="space-y-2">
          {activityStats?.map((stat: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <span className="text-sm">{stat.type}</span>
              <span className="text-sm font-medium">{stat.count} activities</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};