import React from 'react';
import { MetricsSection } from "./MetricsSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { SecuritySection } from "./SecuritySection";
import { MonitoringSection } from "./MonitoringSection";

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
  return (
    <div className="space-y-6">
      <MetricsSection 
        metrics={metrics}
        metricsLoading={metricsLoading}
        metricsError={metricsError}
      />
      <AnalyticsSection />
      <SecuritySection />
      <MonitoringSection />
    </div>
  );
};