
import { Card } from "@/components/ui/card";
import { BiometricVerificationMonitoring } from "@/components/monitoring/BiometricVerificationMonitoring";
import { FlaggedDevices } from "@/components/monitoring/FlaggedDevices";
import { DeviceFingerprintMonitoring } from "@/components/client-dashboard/analytics/DeviceFingerprintMonitoring";
import { IdentityVerificationMonitoring } from "@/components/client-dashboard/analytics/IdentityVerificationMonitoring";
import ErrorBoundary from "@/components/ErrorBoundary";

export const SecuritySection = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <ErrorBoundary>
          <BiometricVerificationMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <FlaggedDevices />
        </ErrorBoundary>
      </div>

      <div className="space-y-6">
        <ErrorBoundary>
          <DeviceFingerprintMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <IdentityVerificationMonitoring />
        </ErrorBoundary>
      </div>
    </div>
  );
};
