/**
 * DashboardTabContent Component
 * 
 * Renders the content for different dashboard tabs based on the selected value.
 * Manages the display of various monitoring and analytics sections.
 * 
 * Features:
 * - Tab-based content switching
 * - Metrics data display
 * - Error handling
 * - Loading states
 */
import { TabsContent } from "@/components/ui/tabs";
import { DashboardContent } from "./DashboardContent";
import { DashboardOverview } from "./DashboardOverview";

interface DashboardTabContentProps {
  /** Current metrics data */
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  /** Loading state for metrics data */
  metricsLoading?: boolean;
  /** Error state for metrics data */
  metricsError?: Error | null;
}

export const DashboardTabContent = ({
  metrics,
  metricsLoading,
  metricsError
}: DashboardTabContentProps) => {
  return (
    <>
      {/* Dashboard Overview Tab */}
      <TabsContent value="dashboard">
        <DashboardOverview
          metrics={metrics}
          metricsLoading={metricsLoading}
          metricsError={metricsError}
        />
      </TabsContent>

      {/* Detailed Content Tab */}
      <TabsContent value="content">
        <DashboardContent
          metrics={metrics}
          metricsLoading={metricsLoading}
          metricsError={metricsError}
        />
      </TabsContent>
    </>
  );
};