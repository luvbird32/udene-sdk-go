import { SeverityBreakdown } from "@/integrations/supabase/types/security";
import { SeverityProgress } from "./SeverityProgress";

/**
 * SeverityBreakdownDisplay Component
 * 
 * Displays a visual breakdown of vulnerability severities in a security scan.
 * Shows the distribution of vulnerabilities across different severity levels
 * with progress bars and counts.
 * 
 * Features:
 * - Visual progress indicators for each severity level
 * - Color-coded severity levels
 * - Real-time count updates
 * - Percentage-based progress bars
 * 
 * @component
 * @example
 * ```tsx
 * const breakdown = {
 *   critical: 5,
 *   high: 10,
 *   medium: 15,
 *   low: 20
 * };
 * 
 * <SeverityBreakdownDisplay 
 *   severityBreakdown={breakdown}
 *   totalVulnerabilities={50}
 * />
 * ```
 */
interface SeverityBreakdownDisplayProps {
  /** Breakdown of vulnerabilities by severity level */
  severityBreakdown: SeverityBreakdown;
  /** Total number of vulnerabilities across all severity levels */
  totalVulnerabilities: number;
}

export const SeverityBreakdownDisplay = ({ 
  severityBreakdown, 
  totalVulnerabilities 
}: SeverityBreakdownDisplayProps) => {
  return (
    <div className="space-y-2">
      <SeverityProgress
        label="Critical"
        count={severityBreakdown.critical}
        total={totalVulnerabilities}
        colorClass="text-red-500"
      />
      <SeverityProgress
        label="High"
        count={severityBreakdown.high}
        total={totalVulnerabilities}
        colorClass="text-orange-500"
      />
      <SeverityProgress
        label="Medium"
        count={severityBreakdown.medium}
        total={totalVulnerabilities}
        colorClass="text-yellow-500"
      />
      <SeverityProgress
        label="Low"
        count={severityBreakdown.low}
        total={totalVulnerabilities}
        colorClass="text-blue-500"
      />
    </div>
  );
};