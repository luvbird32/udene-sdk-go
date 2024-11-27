import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Activity, Shield, Users, Clock, Network } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFraudMetrics, getRecentActivity } from "@/services/api";
import { wsClient } from "@/utils/websocket";
import { useEffect } from "react";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { PerformanceMetrics } from "@/components/monitoring/PerformanceMetrics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { DevTools } from "@/components/developer/DevTools";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MetricCard } from "@/components/dashboard/MetricCard";

const Index = () => {
  const { toast } = useToast();

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["metrics"],
    queryFn: getFraudMetrics,
    refetchInterval: 3000,
    retry: 3,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Error Loading Metrics",
          description: error.message || "Failed to load metrics data",
          variant: "destructive",
        });
      },
    },
  });

  const { data: activities, isLoading: activitiesLoading, error: activitiesError } = useQuery({
    queryKey: ["activities"],
    queryFn: getRecentActivity,
    refetchInterval: 3000,
    retry: 3,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Error Loading Activities",
          description: error.message || "Failed to load activity data",
          variant: "destructive",
        });
      },
    },
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

  // Show loading state when both queries are loading
  if (metricsLoading || activitiesLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-muted-foreground">Loading dashboard data...</p>
      </div>
    );
  }

  // Show error state if either query fails
  if (metricsError || activitiesError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error Loading Dashboard</AlertTitle>
        <AlertDescription>
          {metricsError instanceof Error ? metricsError.message : "Failed to load metrics data"}
          {activitiesError instanceof Error && <br />}
          {activitiesError instanceof Error && activitiesError.message}
        </AlertDescription>
      </Alert>
    );
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
            />
            <MetricCard
              title="Active Users"
              value={metrics?.activeUsers}
              icon={Users}
            />
            <MetricCard
              title="Processing Time"
              value={metrics?.avgProcessingTime}
              suffix="ms"
              icon={Clock}
            />
            <MetricCard
              title="Concurrent Calls"
              value={metrics?.concurrentCalls}
              icon={Network}
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

export default Index;