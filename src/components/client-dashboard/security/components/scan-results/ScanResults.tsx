import { OpenSourceScan } from "@/integrations/supabase/types/security";
import { SeverityBreakdownDisplay } from "../SeverityBreakdownDisplay";
import { RemediationSteps } from "../RemediationSteps";
import { DependencyInfo } from "../DependencyInfo";

interface ScanResultsProps {
  scan: OpenSourceScan;
  totalVulnerabilities: number;
}

export const ScanResults = ({ scan, totalVulnerabilities }: ScanResultsProps) => {
  return (
    <>
      <div className="space-y-4">
        <DependencyInfo dependenciesScanned={scan.dependencies_scanned} />

        <SeverityBreakdownDisplay 
          severityBreakdown={scan.severity_breakdown}
          totalVulnerabilities={totalVulnerabilities}
        />
      </div>

      <RemediationSteps steps={scan.remediation_steps} />
    </>
  );
};