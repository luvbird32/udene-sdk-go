import { InvestigationSection } from "./InvestigationSection";
import { SecuritySection } from "./SecuritySection";
import { MetricsSection } from "./MetricsSection";
import { MonitoringSection } from "./MonitoringSection";

interface DashboardContentProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  metricsLoading?: boolean;
  metricsError?: Error | null;
}

export const DashboardContent = ({ 
  metrics = null, 
  metricsLoading = false, 
  metricsError = null 
}: DashboardContentProps) => {
  return (
    <div className="space-y-6 p-6">
      <MetricsSection 
        metrics={metrics}
        metricsLoading={metricsLoading}
        metricsError={metricsError}
      />
      <SecuritySection />
      <InvestigationSection />
      <MonitoringSection />
    </div>
  );
};