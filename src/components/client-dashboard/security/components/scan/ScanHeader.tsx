import { Shield, AlertTriangle } from "lucide-react";
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
    <div className="flex items-start justify-between">
      <div>
        <h4 className="font-medium flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          {scanType.charAt(0).toUpperCase() + scanType.slice(1)} Scan
          {status && <span className="ml-2 text-xs text-muted-foreground">({status})</span>}
        </h4>
        <p className="text-sm text-muted-foreground">
          Started: {format(new Date(startTime), 'PPp')}
        </p>
        {endTime && (
          <p className="text-sm text-muted-foreground">
            Completed: {format(new Date(endTime), 'PPp')}
          </p>
        )}
      </div>
      {totalVulnerabilities > 0 && (
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
      )}
    </div>
  );
};