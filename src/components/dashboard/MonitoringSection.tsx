import { CustomerBehavior } from "@/components/monitoring/CustomerBehavior";
import { RiskFactorAnalysis } from "@/components/monitoring/RiskFactorAnalysis";
import { FeedbackManagement } from "@/components/monitoring/FeedbackManagement";

export const MonitoringSection = () => {
  return (
    <div className="space-y-6">
      <CustomerBehavior />
      <RiskFactorAnalysis />
      <FeedbackManagement />
    </div>
  );
};