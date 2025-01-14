import { TabsContent } from "@/components/ui/tabs";
import { DashboardContent } from "../DashboardContent";
import { SecuritySection } from "../SecuritySection";

interface DashboardTabContentProps {
  metrics: any;
  metricsLoading: boolean;
  metricsError: Error | null;
}

export const DashboardTabContent = ({ metrics, metricsLoading, metricsError }: DashboardTabContentProps) => {
  return (
    <>
      <TabsContent value="dashboard" className="glass-card p-6 rounded-lg">
        <DashboardContent 
          metrics={metrics}
          metricsLoading={metricsLoading}
          metricsError={metricsError}
        />
      </TabsContent>
      
      <TabsContent value="security" className="glass-card p-6 rounded-lg">
        <SecuritySection />
      </TabsContent>
    </>
  );
};