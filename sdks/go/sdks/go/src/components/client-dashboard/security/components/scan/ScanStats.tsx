/**
 * ScanStats Component
 * 
 * Displays statistical information about a vulnerability scan, including
 * status, total vulnerabilities, severity breakdown, and completion time.
 * 
 * Features:
 * - Status indicator with appropriate styling
 * - Vulnerability count summary
 * - Severity distribution visualization
 * - Scan completion timestamp
 * 
 * @param {Object} props
 * @param {string} props.status - Current status of the scan
 * @param {number} props.totalVulnerabilities - Total number of vulnerabilities found
 * @param {Object} props.severityBreakdown - Distribution of vulnerabilities by severity
 * @param {string | null} props.endTime - Timestamp when the scan completed
 */
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { SeverityBreakdownDisplay } from "../SeverityBreakdownDisplay";

interface ScanStatsProps {
  status: string;
  totalVulnerabilities: number;
  severityBreakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  endTime: string | null;
}

export const ScanStats = ({
  status,
  totalVulnerabilities,
  severityBreakdown,
  endTime,
}: ScanStatsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge 
          variant={status === 'completed' ? 'default' : 'secondary'}
          className="capitalize"
        >
          {status}
        </Badge>
        {endTime && (
          <span className="text-sm text-muted-foreground">
            Completed: {format(new Date(endTime), 'PPp')}
          </span>
        )}
      </div>

      <SeverityBreakdownDisplay 
        severityBreakdown={severityBreakdown}
        totalVulnerabilities={totalVulnerabilities}
      />
    </div>
  );
};