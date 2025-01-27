import { InvestigationSection } from "./InvestigationSection";
import { SecuritySection } from "./SecuritySection";
import { MetricsSection } from "./MetricsSection";
import { MonitoringSection } from "./MonitoringSection";

export const DashboardContent = () => {
  return (
    <div className="space-y-6 p-6">
      <MetricsSection />
      <SecuritySection />
      <InvestigationSection />
      <MonitoringSection />
    </div>
  );
};