import React from 'react';
import { MetricsSection } from "./MetricsSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { SecuritySection } from "./SecuritySection";
import { MonitoringSection } from "./MonitoringSection";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";

interface DashboardContentProps {
  metrics: any;
  metricsLoading: boolean;
  metricsError: Error | null;
}

export const DashboardContent = ({ 
  metrics, 
  metricsLoading, 
  metricsError 
}: DashboardContentProps) => {
  if (metricsLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (metricsError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load dashboard data: {metricsError.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <ErrorBoundary>
        <MetricsSection 
          metrics={metrics || {}}
          metricsLoading={metricsLoading}
          metricsError={metricsError}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <AnalyticsSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <SecuritySection />
      </ErrorBoundary>

      <ErrorBoundary>
        <MonitoringSection />
      </ErrorBoundary>
    </div>
  );
};