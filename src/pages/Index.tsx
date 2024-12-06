import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Activity, Shield, Users, Clock, Settings, Network } from "lucide-react";
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
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["metrics"],
    queryFn: getFraudMetrics,
    refetchInterval: 3000,
    retry: 1,
  });

  const { data: activities, isLoading: activitiesLoading, error: activitiesError } = useQuery({
    queryKey: ["activities"],
    queryFn: getRecentActivity,
    refetchInterval: 3000,
    retry: 1,
  });

  useEffect(() => {
    const fraudAlertsChannel = supabase
      .channel('fraud_alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'fraud_alerts'
        },
        (payload) => {
          toast({
            title: "New Fraud Alert",
            description: payload.new.description,
            variant: "destructive",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(fraudAlertsChannel);
    };
  }, [toast]);

  const renderError = (error: Error) => (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message || "An error occurred while loading the dashboard"}
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="min-h-screen bg-background p-6" role="main">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2" tabIndex={0}>Fraud Detection System</h1>
          <p className="text-muted-foreground" tabIndex={0}>Comprehensive monitoring, analysis, and documentation</p>
        </div>
        <Link 
          to="/settings" 
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </header>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="docs">API Documentation</TabsTrigger>
          <TabsTrigger value="devtools">Developer Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8">
          {(metricsError || activitiesError) && renderError(metricsError || activitiesError)}
          
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
