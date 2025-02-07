
import { Card } from "@/components/ui/card";
import { BiometricVerificationMonitoring } from "@/components/monitoring/BiometricVerificationMonitoring";
import { FlaggedDevices } from "@/components/monitoring/FlaggedDevices";
import { DeviceFingerprintMonitoring } from "@/components/client-dashboard/analytics/DeviceFingerprintMonitoring";
import { IdentityVerificationMonitoring } from "@/components/client-dashboard/analytics/IdentityVerificationMonitoring";
import ErrorBoundary from "@/components/ErrorBoundary";

/**
 * SecuritySection Component
 * 
 * Displays comprehensive security monitoring information including:
 * - Biometric verification status and trends
 * - Flagged device monitoring and analysis
 * - Device fingerprint tracking and analytics
 * - Identity verification metrics and status
 * 
 * Each monitoring component is wrapped in an ErrorBoundary for resilient error handling.
 */
export const SecuritySection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <BiometricVerificationMonitoring />
        </ErrorBoundary>
        <ErrorBoundary>
          <FlaggedDevices />
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
