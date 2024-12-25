/**
 * @component ScanStats
 * @description Displays statistical information about a security scan, including
 * status, total vulnerabilities found, and severity breakdown. Also shows completion
 * time if the scan has finished.
 *
 * @param {Object} props - Component props
 * @param {string} props.status - Current status of the scan (e.g., "completed", "in_progress")
 * @param {number} props.totalVulnerabilities - Total number of vulnerabilities detected
 * @param {Object} props.severityBreakdown - Distribution of vulnerabilities by severity level
 * @param {string | null} props.endTime - Timestamp when the scan completed (if finished)
 *
 * @example
 * ```tsx
 * <ScanStats
 *   status="completed"
 *   totalVulnerabilities={12}
 *   severityBreakdown={{ critical: 2, high: 3, medium: 4, low: 3 }}
 *   endTime="2024-03-15T10:30:00Z"
 * />
 * ```
 */
import { format } from "date-fns";

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
  endTime 
}: ScanStatsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Status: {status}</span>
        <span className="text-sm font-medium">
          Total Vulnerabilities: {totalVulnerabilities}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-sm">
          <p>Critical: {severityBreakdown.critical}</p>
          <p>High: {severityBreakdown.high}</p>
        </div>
        <div className="text-sm">
          <p>Medium: {severityBreakdown.medium}</p>
          <p>Low: {severityBreakdown.low}</p>
        </div>
      </div>

      {endTime && (
        <p className="text-sm text-muted-foreground">
          Completed: {format(new Date(endTime), 'PPp')}
        </p>
      )}
    </div>
  );
};