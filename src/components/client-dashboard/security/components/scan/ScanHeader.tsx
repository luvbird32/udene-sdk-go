import { Shield } from "lucide-react";
import { format } from "date-fns";

interface ScanHeaderProps {
  scanType: string;
  startTime: string;
  endTime: string | null;
  totalVulnerabilities: number;
  status: string;
}

export const ScanHeader = ({ 
  scanType, 
  startTime, 
  endTime, 
  totalVulnerabilities,
  status 
}: ScanHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">{scanType} Scan</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Started: {format(new Date(startTime), 'PPp')}
          {endTime && ` • Completed: ${format(new Date(endTime), 'PPp')}`}
        </p>
      </div>
      <div className="text-sm font-medium">
        {totalVulnerabilities} vulnerabilities • {status}
      </div>
    </div>
  );
};