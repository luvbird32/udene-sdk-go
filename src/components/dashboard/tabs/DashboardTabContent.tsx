import { TabsContent } from "@/components/ui/tabs";
import { DashboardContent } from "../DashboardContent";

interface DashboardTabContentProps {
  metrics: any;
  metricsLoading: boolean;
  metricsError: Error | null;
}

export const DashboardTabContent = ({ metrics, metricsLoading, metricsError }: DashboardTabContentProps) => {
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