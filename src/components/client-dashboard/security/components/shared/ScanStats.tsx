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
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-medium">Total Vulnerabilities</p>
        <p className="text-2xl font-bold">{totalVulnerabilities}</p>
      </div>
      <div>
        <p className="text-sm font-medium">Severity Breakdown</p>
        <div className="space-y-1">
          <p className="text-xs">Critical: {severityBreakdown.critical}</p>
          <p className="text-xs">High: {severityBreakdown.high}</p>
          <p className="text-xs">Medium: {severityBreakdown.medium}</p>
          <p className="text-xs">Low: {severityBreakdown.low}</p>
        </div>
      </div>
    </div>
  );
};