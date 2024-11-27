import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Activity, Shield, Users, Clock, Network } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFraudMetrics, getRecentActivity } from "@/services/api";
import { wsClient } from "@/utils/websocket";
import { useEffect, useState } from "react";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { PerformanceMetrics } from "@/components/monitoring/PerformanceMetrics";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { DevTools } from "@/components/developer/DevTools";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

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
    wsClient.connect();
    
    const handleWebSocketMessage = (data: any) => {
      if (data.type === 'fraud_alert') {
        toast({
          title: "Real-time Fraud Alert",
          description: "New fraudulent activity detected",
          variant: "destructive",
        });
      }
    };

    wsClient.subscribe(handleWebSocketMessage);

    return () => {
      wsClient.unsubscribe(handleWebSocketMessage);
      wsClient.disconnect();
    };
  }, [toast]);

  if (metricsError || activitiesError) {
    throw new Error("Failed to load dashboard data");
  }

  return (
    <div className="space-y-6" role="main">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2" tabIndex={0}>Fraud Detection System</h1>
        <p className="text-muted-foreground" tabIndex={0}>Comprehensive monitoring, analysis, and documentation</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="docs">API Documentation</TabsTrigger>
          <TabsTrigger value="devtools">Developer Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="region" aria-label="Key Metrics">
            <MetricCard
              title="Risk Score"
              value={metrics?.riskScore}
              icon={Shield}
              showProgress
              isLoading={metricsLoading}
            />
            <MetricCard
              title="Active Users"
              value={metrics?.activeUsers}
              icon={Users}
              isLoading={metricsLoading}
            />
            <MetricCard
              title="Processing Time"
              value={`${metrics?.avgProcessingTime}ms`}
              icon={Clock}
              isLoading={metricsLoading}
            />
            <MetricCard
              title="Concurrent Calls"
              value={metrics?.concurrentCalls}
              icon={Network}
              isLoading={metricsLoading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HealthStatus />
            <ErrorLog />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <PerformanceMetrics />
          </div>
        </TabsContent>

        <TabsContent value="docs">
          <ApiDocs />
        </TabsContent>

        <TabsContent value="devtools">
          <DevTools />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value?: number | string;
  icon: React.ElementType;
  showProgress?: boolean;
  isLoading?: boolean;
}

const MetricCard = ({ title, value, icon: Icon, showProgress, isLoading }: MetricCardProps) => (
  <Card className="p-6" role="article" aria-label={title}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <Icon className="text-secondary w-5 h-5" aria-hidden="true" />
    </div>
    {isLoading ? (
      <Skeleton className="h-8 w-24" />
    ) : showProgress ? (
      <div className="space-y-2">
        <Progress value={Number(value)} className="h-2" aria-label={`${title} Progress`} />
        <p className="text-2xl font-bold" aria-live="polite">{value}%</p>
      </div>
    ) : (
      <p className="text-2xl font-bold" aria-live="polite">{value}</p>
    )}
  </Card>
);

export default Index;
