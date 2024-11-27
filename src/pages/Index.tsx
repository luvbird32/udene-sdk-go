import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Activity, AlertTriangle, Shield, Users } from "lucide-react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFraudMetrics, getRecentActivity } from "@/services/api";

const Index = () => {
  const { toast } = useToast();

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["metrics"],
    queryFn: getFraudMetrics,
    refetchInterval: 3000,
  });

  const { data: activities, isLoading: activitiesLoading, error: activitiesError } = useQuery({
    queryKey: ["activities"],
    queryFn: getRecentActivity,
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (metrics?.alertCount && metrics.alertCount > 0) {
      toast({
        title: "Potential Fraud Detected",
        description: "Unusual activity detected in the system",
        variant: "destructive",
      });
    }
  }, [metrics?.alertCount, toast]);

  if (metricsLoading || activitiesLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (metricsError || activitiesError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-destructive">
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Fraud Detection Dashboard</h1>
        <p className="text-muted-foreground">Real-time monitoring and analysis</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Risk Score</h3>
            <Shield className="text-secondary w-5 h-5" />
          </div>
          <div className="space-y-2">
            <Progress value={metrics?.riskScore ?? 0} className="h-2" />
            <p className="text-2xl font-bold">{metrics?.riskScore?.toFixed(1) ?? 0}%</p>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Active Users</h3>
            <Users className="text-secondary w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">{metrics?.activeUsers?.toLocaleString() ?? 0}</p>
          <p className="text-sm text-muted-foreground">Currently monitoring</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Alerts</h3>
            <AlertTriangle className="text-warning w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">{metrics?.alertCount ?? 0}</p>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">API Calls</h3>
            <Activity className="text-secondary w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">{(metrics?.apiCalls ?? 0).toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Today's requests</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {(activities ?? []).map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-md bg-background/50">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse-slow"
                  style={{ 
                    backgroundColor: activity.type === "suspicious" ? '#ff9800' : '#4caf50' 
                  }} 
                />
                <div>
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="font-semibold text-foreground mb-4">API Documentation</h3>
          <div className="space-y-4">
            <div className="p-3 rounded-md bg-background/50">
              <p className="text-sm font-medium mb-1">Track User Interaction</p>
              <code className="text-xs text-muted-foreground block">
                POST /api/v1/track
              </code>
              <p className="text-xs text-muted-foreground mt-1">
                Send user interaction data for fraud analysis
              </p>
            </div>
            <div className="p-3 rounded-md bg-background/50">
              <p className="text-sm font-medium mb-1">Get Risk Score</p>
              <code className="text-xs text-muted-foreground block">
                GET /api/v1/metrics
              </code>
              <p className="text-xs text-muted-foreground mt-1">
                Retrieve current risk metrics and statistics
              </p>
            </div>
            <div className="p-3 rounded-md bg-background/50">
              <p className="text-sm font-medium mb-1">Recent Activity</p>
              <code className="text-xs text-muted-foreground block">
                GET /api/v1/activity
              </code>
              <p className="text-xs text-muted-foreground mt-1">
                Get latest fraud detection events and alerts
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;