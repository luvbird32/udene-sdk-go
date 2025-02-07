
/**
 * DashboardContent Component
 * 
 * Main dashboard layout component that organizes and displays various monitoring sections:
 * - Connection status for system health monitoring
 * - API usage tracking and credit management
 * - Key performance metrics and risk analytics
 * - Business intelligence metrics
 * - Detailed analytics visualizations
 * 
 * The component handles loading states and error conditions for metrics data,
 * ensuring graceful degradation when data is unavailable.
 * 
 * @param {DashboardContentProps} props - Component properties including metrics data and loading state
 * @returns {JSX.Element} Rendered dashboard content with all monitoring sections
 */

import { ConnectionSection } from "@/components/dashboard/sections/ConnectionSection";
import { ApiSection } from "@/components/dashboard/sections/ApiSection";
import { MetricsSection } from "@/components/dashboard/sections/MetricsSection";
import { AnalyticsSection } from "@/components/dashboard/sections/AnalyticsSection";
import { BusinessIntelligence } from "./analytics/BusinessIntelligence";

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

export const DashboardContent = ({ 
  metrics, 
  metricsLoading, 
  metricsError 
}: DashboardContentProps) => {
  return (
    <div className="space-y-8">
      {/* Connection status section showing system health */}
      <ConnectionSection />
      
      {/* API usage section displaying credits and rate limits */}
      <ApiSection />
      
      {/* Key metrics section showing risk scores and transaction data */}
      <MetricsSection 
        metrics={metrics}
        metricsLoading={metricsLoading}
        metricsError={metricsError}
      />

      {/* Business Intelligence metrics and analysis */}
      <BusinessIntelligence />
      
      {/* Analytics section with charts and data visualizations */}
      <AnalyticsSection />
    </div>
  );
};
