import { Card } from "@/components/ui/card";
import { RiskIndicators } from "./RiskIndicators";
import { EmailChangeMonitoring } from "./EmailChangeMonitoring";
import { CustomerBehavior } from "./CustomerBehavior";
import { DetectionMetrics } from "./DetectionMetrics";
import { ErrorLog } from "./ErrorLog";
import { FeedbackManagement } from "./FeedbackManagement";
import { FlaggedDevices } from "./FlaggedDevices";
import { HealthStatus } from "./HealthStatus";
import { IPAddressMonitoring } from "./IPAddressMonitoring";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { RateLimitStatus } from "./RateLimitStatus";
import { RequestPatterns } from "./RequestPatterns";
import { RiskChart } from "./RiskChart";
import { RiskFactorAnalysis } from "./RiskFactorAnalysis";
import { VPNDetection } from "./VPNDetection";

export const MonitoringSection = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <EmailChangeMonitoring />
      <RiskIndicators 
        indicators={[]} 
        additionalFactors={[]}
      />
      <CustomerBehavior />
      <DetectionMetrics />
      <ErrorLog />
      <FeedbackManagement />
      <FlaggedDevices />
      <HealthStatus />
      <IPAddressMonitoring />
      <PerformanceMetrics />
      <RateLimitStatus />
      <RequestPatterns />
      <RiskChart />
      <RiskFactorAnalysis />
      <VPNDetection />
    </div>
  );
};