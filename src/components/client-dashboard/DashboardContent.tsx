import { ConnectionSection } from "@/components/dashboard/sections/ConnectionSection";
import { ApiSection } from "@/components/dashboard/sections/ApiSection";
import { MetricsSection } from "@/components/dashboard/sections/MetricsSection";
import { AnalyticsSection } from "@/components/dashboard/sections/AnalyticsSection";

/**
 * Props interface for the DashboardContent component
 * @property {Object} metrics - Optional metrics data containing risk score and transaction counts
 * @property {boolean} metricsLoading - Flag indicating if metrics are being loaded
 * @property {Error} metricsError - Error object if metrics fetching fails
 */
interface DashboardContentProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  metricsLoading?: boolean;
  metricsError?: Error | null;
}

/**
 * DashboardContent Component
 * 
 * Renders the main content sections of the client dashboard including:
 * - Connection status
 * - API usage and credits
 * - Key metrics and statistics
 * - Analytics visualizations
 * 
 * @param {DashboardContentProps} props - Component props
 * @returns {JSX.Element} The rendered dashboard content
 */
export const DashboardContent = ({ 
  metrics, 
  metricsLoading, 
  metricsError 
}: DashboardContentProps) => {
  return (
    <div className="space-y-8">
      {/* Connection status section showing system health and connectivity */}
      <ConnectionSection />
      
      {/* API usage section displaying credits and rate limits */}
      <ApiSection />
      
      {/* Key metrics section showing risk scores and transaction data */}
      <MetricsSection 
        metrics={metrics}
        metricsLoading={metricsLoading}
        metricsError={metricsError}
      />
      
      {/* Analytics section with charts and data visualizations */}
      <AnalyticsSection />
    </div>
  );
};