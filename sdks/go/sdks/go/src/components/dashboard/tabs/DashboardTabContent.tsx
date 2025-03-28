import { TabsContent } from "@/components/ui/tabs";
import { DashboardContent } from "../DashboardContent";

interface DashboardTabContentProps {
  metrics?: {
    riskScore: number;
    totalTransactions: number;
    flaggedTransactions: number;
  } | null;
  metricsLoading?: boolean;
  metricsError?: Error | null;
}

export const DashboardTabContent = ({ 
  metrics = null, 
  metricsLoading = false, 
  metricsError = null 
}: DashboardTabContentProps) => {
  return (
    <TabsContent value="dashboard" className="glass-card p-6 rounded-lg">
      <DashboardContent 
        metrics={metrics}
        metricsLoading={metricsLoading}
        metricsError={metricsError}
      />
    </TabsContent>
  );
};