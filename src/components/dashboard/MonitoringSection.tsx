import { CustomerBehavior } from "@/components/monitoring/CustomerBehavior";
import { RiskFactorAnalysis } from "@/components/monitoring/RiskFactorAnalysis";
import { FeedbackManagement } from "@/components/monitoring/FeedbackManagement";
import ErrorBoundary from "@/components/ErrorBoundary";

export const MonitoringSection = () => {
  return (
    <div className="space-y-6">
      <ErrorBoundary>
        <CustomerBehavior />
      </ErrorBoundary>
      <ErrorBoundary>
        <RiskFactorAnalysis />
      </ErrorBoundary>
      <ErrorBoundary>
        <FeedbackManagement />
      </ErrorBoundary>
    </div>
  );
};