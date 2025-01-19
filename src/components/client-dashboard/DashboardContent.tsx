import { ConnectionSection } from "@/components/dashboard/sections/ConnectionSection";
import { ApiSection } from "@/components/dashboard/sections/ApiSection";
import { MetricsSection } from "@/components/dashboard/sections/MetricsSection";
import { AnalyticsSection } from "@/components/dashboard/sections/AnalyticsSection";

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
  metrics, 
  metricsLoading, 
  metricsError 
}: DashboardContentProps) => {
  return (
    <div className="space-y-8 text-white">
      <ConnectionSection />
      <ApiSection />
      <MetricsSection 
        metrics={metrics}
        metricsLoading={metricsLoading}
        metricsError={metricsError}
      />
      <AnalyticsSection />
    </div>
  );
};