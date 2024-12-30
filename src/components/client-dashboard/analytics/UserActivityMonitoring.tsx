import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { ActivityChart } from "./activity/ActivityChart";
import { ActivityLoadingState } from "./activity/ActivityLoadingState";
import { ActivityErrorState } from "./activity/ActivityErrorState";
import { useActivityData } from "./activity/useActivityData";

export const UserActivityMonitoring = () => {
  const { data: activityData, isLoading, error } = useActivityData();

  if (isLoading) {
    return (
      <Card className="p-4">
        <ActivityLoadingState />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <ActivityErrorState />
      </Card>
    );
  }

  if (!activityData || activityData.length === 0) {
    return (
      <Card className="p-4">
        <div className="text-center py-8">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
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
      </div>
      <ActivityChart 
        activityData={activityData}
        totalSecurityEvents={totalSecurityEvents}
      />
    </Card>
  );
};