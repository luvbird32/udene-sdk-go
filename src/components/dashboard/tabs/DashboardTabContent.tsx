import { TabsContent } from "@/components/ui/tabs";
import { DashboardContent } from "../DashboardContent";
import { ClientAnalytics } from "@/components/dashboard/analytics/ClientAnalytics";
import { SecuritySection } from "@/components/dashboard/SecuritySection";
import DatabaseSection from "@/components/dashboard/DatabaseSection";
import { DataExtractionSection } from "@/components/dashboard/DataExtractionSection";

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

      <TabsContent value="client-analytics" className="glass-card p-6 rounded-lg">
        <ClientAnalytics />
      </TabsContent>

      <TabsContent value="security" className="glass-card p-6 rounded-lg">
        <SecuritySection />
      </TabsContent>

      <TabsContent value="database" className="glass-card p-6 rounded-lg">
        <DatabaseSection />
        <div className="mt-8">
          <DataExtractionSection />
        </div>
      </TabsContent>
    </>
  );
};