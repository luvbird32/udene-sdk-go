import { SecurityProgramList } from "@/components/client-dashboard/security/SecurityProgramList";
import { OpenSourceSecurity } from "@/components/client-dashboard/security/OpenSourceSecurity";
import { VulnerabilityScanning } from "@/components/client-dashboard/security/VulnerabilityScanning";
import { DependencyMonitor } from "@/components/client-dashboard/security/components/dependency/DependencyMonitor";
import ErrorBoundary from "@/components/ErrorBoundary";

export const SecuritySection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <OpenSourceSecurity />
        </ErrorBoundary>
        <ErrorBoundary>
          <VulnerabilityScanning />
        </ErrorBoundary>
      </div>

      <ErrorBoundary>
        <DependencyMonitor />
      </ErrorBoundary>

      <ErrorBoundary>
        <SecurityProgramList />
      </ErrorBoundary>
    </div>
  );
};