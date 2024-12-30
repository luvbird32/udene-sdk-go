import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertCircle, Loader2, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export const UserActivityMonitoring = () => {
  const { toast } = useToast();
  const { data: activityData, isLoading, error } = useQuery({
    queryKey: ["user-activity-stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Fetch both activities and security events
      const [activitiesResponse, securityResponse] = await Promise.all([
        supabase
          .from('user_activities')
          .select('activity_type, created_at')
          .order('created_at', { ascending: true })
          .limit(100),
        supabase
          .from('service_investigation_logs')
          .select('investigation_type, created_at, status')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
      ]);

      if (activitiesResponse.error) throw activitiesResponse.error;
      if (securityResponse.error) throw securityResponse.error;

      // Group activities by date
      const groupedActivities = activitiesResponse.data?.reduce((acc: Record<string, any>, curr) => {
        const date = new Date(curr.created_at).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = {
            date,
            activityCount: 0,
            securityEvents: 0
          };
        }
        acc[date].activityCount += 1;
        return acc;
      }, {});

      // Add security events to the grouped data
      securityResponse.data?.forEach(event => {
        const date = new Date(event.created_at).toLocaleDateString();
        if (!groupedActivities[date]) {
          groupedActivities[date] = {
            date,
            activityCount: 0,
            securityEvents: 0
          };
        }
        groupedActivities[date].securityEvents += 1;
      });

      return Object.values(groupedActivities || {});
    },
    meta: {
      errorHandler: (error: Error) => {
        toast({
          title: "Error",
          description: "Failed to load user activity data",
          variant: "destructive",
        });
      },
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-[200px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading activity data...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load user activity data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!activityData || activityData.length === 0) {
    return (
      <Card className="p-4">
        <div className="text-center py-8">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No activity data available</p>
        </div>
      </Card>
    );
  }

  const totalSecurityEvents = activityData.reduce((sum, day) => sum + day.securityEvents, 0);

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Security Monitoring</h3>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">Last 100 Activities</Badge>
          {totalSecurityEvents > 0 && (
            <Badge variant="destructive">
              {totalSecurityEvents} Security Events
            </Badge>
          )}
        </div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="activityCount" 
              name="Activities"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="securityEvents" 
              name="Security Events"
              stroke="#ff4d4f"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};