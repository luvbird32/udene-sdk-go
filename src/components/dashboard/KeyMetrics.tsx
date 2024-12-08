import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, Users, Clock, Network } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardProps {
  title: string;
  value?: number | string;
  icon: React.ElementType;
  showProgress?: boolean;
  isLoading?: boolean;
}

const MetricCard = ({ title, value, icon: Icon, showProgress, isLoading }: MetricCardProps) => (
  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]" role="article" aria-label={title}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <Icon className="text-secondary w-5 h-5 animate-pulse-slow" aria-hidden="true" />
    </div>
    {isLoading ? (
      <div className="space-y-2">
        <Skeleton className="h-8 w-24" />
        {showProgress && <Skeleton className="h-2 w-full" />}
      </div>
    ) : showProgress ? (
      <div className="space-y-2">
        <Progress 
          value={Number(value)} 
          className="h-2 transition-all duration-300" 
          aria-label={`${title} Progress`} 
        />
        <p className="text-2xl font-bold animate-fade-in" aria-live="polite">{value}%</p>
      </div>
    ) : (
      <p className="text-2xl font-bold animate-fade-in" aria-live="polite">{value}</p>
    )}
  </Card>
);

interface KeyMetricsProps {
  metrics?: {
    riskScore: number;
    activeUsers: number;
    avgProcessingTime: number;
    concurrentCalls: number;
  };
  isLoading: boolean;
}

export const KeyMetrics = ({ metrics, isLoading }: KeyMetricsProps) => (
  <div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" 
    role="region" 
    aria-label="Key Metrics"
  >
    <MetricCard
      title="Risk Score"
      value={metrics?.riskScore}
      icon={Shield}
      showProgress
      isLoading={isLoading}
    />
    <MetricCard
      title="Active Users"
      value={metrics?.activeUsers}
      icon={Users}
      isLoading={isLoading}
    />
    <MetricCard
      title="Processing Time"
      value={`${metrics?.avgProcessingTime}ms`}
      icon={Clock}
      isLoading={isLoading}
    />
    <MetricCard
      title="Concurrent Calls"
      value={metrics?.concurrentCalls}
      icon={Network}
      isLoading={isLoading}
    />
  </div>
);