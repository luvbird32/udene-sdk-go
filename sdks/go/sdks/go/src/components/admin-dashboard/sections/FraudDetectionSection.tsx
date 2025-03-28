import { Card } from "@/components/ui/card";
import { ExploitationMetrics } from "@/components/monitoring/ExploitationMetrics";
import { InvestigationSection } from "@/components/admin-dashboard/investigation/InvestigationSection";

export const FraudDetectionSection = () => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Fraud Detection & Investigation</h2>
      <div className="space-y-6">
        <ExploitationMetrics />
        <InvestigationSection />
      </div>
    </Card>
  );
};