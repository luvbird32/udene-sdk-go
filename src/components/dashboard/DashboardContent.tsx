
/**
 * DashboardContent Component
 * 
 * Primary dashboard component that organizes and displays various monitoring sections:
 * - Metrics display for key performance indicators
 * - Security monitoring and analysis
 * - Investigation tracking and management
 * - System monitoring and health checks
 * 
 * The component handles data presentation in a structured layout while managing
 * loading states and error conditions for metrics data.
 * 
 * @component
 * @example
 * ```tsx
 * <DashboardContent 
 *   metrics={metricsData}
 *   metricsLoading={false}
 *   metricsError={null}
 * />
 * ```
 */

import { InvestigationSection } from "./InvestigationSection";
import { SecuritySection } from "./SecuritySection";
import { MetricsSection } from "./MetricsSection";
import { MonitoringSection } from "./MonitoringSection";

/**
 * Props interface for the DashboardContent component
 * @property {Object} metrics - Optional metrics data containing risk scores and transaction counts
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
