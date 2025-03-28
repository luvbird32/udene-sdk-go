import React from 'react';
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';

interface ScanHeaderProps {
  scanType?: string;
  startTime?: string;
  endTime?: string | null;
  totalVulnerabilities?: number;
  status?: string;
}

export const ScanHeader: React.FC<ScanHeaderProps> = ({
  scanType = 'Security',
  startTime,
  endTime,
  totalVulnerabilities = 0,
  status = 'pending'
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h4 className="text-lg font-semibold">
          {scanType} Scan
        </h4>
        {startTime && (
          <p className="text-sm text-muted-foreground">
            Started {formatDistanceToNow(new Date(startTime), { addSuffix: true })}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <Badge variant="outline" className={getStatusColor(status)}>
            {status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
        <div className="text-sm font-medium">
          Found: {totalVulnerabilities}
        </div>
      </div>
    </div>
  );
};