/**
 * ScanResults Component
 * 
 * Displays the results of a security scan, including vulnerabilities found,
 * severity distribution, and recommended remediation steps.
 * 
 * Features:
 * - Vulnerability severity breakdown
 * - Total dependencies scanned
 * - Remediation recommendations
 * - Clean and organized layout
 * 
 * @component
 * @example
 * ```tsx
 * const scanResults = {
 *   totalVulnerabilities: 12,
 *   severityBreakdown: { critical: 2, high: 3, medium: 4, low: 3 },
 *   findings: [...],
 *   remediationSteps: {...}
 * };
 * 
 * <ScanResults scan={scanResults} />
 * ```
 */
import { OpenSourceScan } from "@/integrations/supabase/types/security";
import { SeverityBreakdownDisplay } from "../SeverityBreakdownDisplay";
import { RemediationSteps } from "../RemediationSteps";
import { DependencyInfo } from "../DependencyInfo";

interface ScanResultsProps {
  /** The scan result object containing all scan data */
  scan: OpenSourceScan;
  /** Total number of vulnerabilities found in the scan */
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