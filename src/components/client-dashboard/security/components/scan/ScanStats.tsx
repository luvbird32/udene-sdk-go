import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { calculateScanProgress } from "../../utils/scanUtils";

interface SeverityBreakdown {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface ScanStatsProps {
  status: string;
  totalVulnerabilities: number;
  severityBreakdown: SeverityBreakdown;
  endTime: string | null;
}

export const ScanStats = ({ 
  status, 
  totalVulnerabilities, 
  severityBreakdown, 
  endTime 
}: ScanStatsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="flex items-center gap-2">
          Status: {status} 
          {status === 'in_progress' && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
        </span>
        <span className="font-medium">
          {totalVulnerabilities} vulnerabilities found
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex justify-between">
          <span>Critical:</span>
          <span className="text-red-500 font-medium">
            {severityBreakdown.critical}
          </span>
        </div>
        <div className="flex justify-between">
          <span>High:</span>
          <span className="text-orange-500 font-medium">
            {severityBreakdown.high}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Medium:</span>
          <span className="text-yellow-500 font-medium">
            {severityBreakdown.medium}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Low:</span>
          <span className="text-green-500 font-medium">
            {severityBreakdown.low}
          </span>
        </div>
      </div>

      {status === 'in_progress' && (
        <div className="space-y-1">
          <Progress value={calculateScanProgress(status, endTime)} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            Scanning in progress...
          </p>
        </div>
      )}
    </div>
  );
};