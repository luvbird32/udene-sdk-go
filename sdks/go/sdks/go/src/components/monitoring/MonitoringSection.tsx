import { Card } from "@/components/ui/card";
import { CustomerBehavior } from "./CustomerBehavior";
import { RiskFactorAnalysis } from "./RiskFactorAnalysis";
import { FeedbackManagement } from "./FeedbackManagement";
import { EmailChangeMonitoring } from "./email-change/EmailChangeMonitoring";
import { VPNDetection } from "./VPNDetection";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const MonitoringSection = () => {
  const { data: currentUser } = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmailChangeMonitoring />
        <VPNDetection profileId={currentUser.id} />
      </div>
      <CustomerBehavior />
      <RiskFactorAnalysis />
      <FeedbackManagement />
    </div>
  );
};