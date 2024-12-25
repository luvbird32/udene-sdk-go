/**
 * @component ScanResults
 * @description Displays the results of a security scan, including vulnerabilities found,
 * severity distribution, and recommended remediation steps.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.scan - The scan result object
 * @param {number} props.scan.totalVulnerabilities - Total number of vulnerabilities found
 * @param {Object} props.scan.severityBreakdown - Distribution of vulnerabilities by severity
 * @param {Array<Object>} props.scan.findings - Detailed findings from the scan
 * @param {Object} props.scan.remediationSteps - Recommended steps to address findings
 * 
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
