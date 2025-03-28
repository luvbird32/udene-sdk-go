/**
 * OpenSourceStats Component
 * 
 * Displays statistical information about open source security scans,
 * including dependency counts and severity breakdowns.
 * 
 * Features:
 * - Total dependencies count display
 * - Severity distribution visualization
 * - Clean and organized layout
 * - Responsive design
 * 
 * @param {Object} props Component props
 * @param {OpenSourceScan} props.scan The scan result data
 * @param {number} props.totalVulnerabilities Total number of vulnerabilities found
 * 
 * @example
 * ```tsx
 * <OpenSourceStats 
 *   scan={scanData} 
 *   totalVulnerabilities={15}
 * />
 * ```
 */
import { OpenSourceScan } from "@/integrations/supabase/types/security";
import { DependencyInfo } from "../DependencyInfo";
import { SeverityBreakdownDisplay } from "../SeverityBreakdownDisplay";

interface OpenSourceStatsProps {
  scan: OpenSourceScan;
  totalVulnerabilities: number;
}

export const OpenSourceStats = ({ scan, totalVulnerabilities }: OpenSourceStatsProps) => {
  return (
    <div className="space-y-4">
      <DependencyInfo dependenciesScanned={scan.dependencies_scanned} />
      <SeverityBreakdownDisplay 
        severityBreakdown={scan.severity_breakdown}
        totalVulnerabilities={totalVulnerabilities}
      />
    </div>
  );
};