import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Log {
  id: string;
  investigation_type: string;
  status: string;
  created_at: string;
  notes: string;
}

interface InvestigationLogListProps {
  logs: Log[];
}

export const InvestigationLogList = ({ logs }: InvestigationLogListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="border rounded-lg p-4 hover:bg-accent transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{log.investigation_type}</h3>
                <Badge variant="outline" className={getStatusColor(log.status)}>
                  {log.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Created on {format(new Date(log.created_at), "MMM d, yyyy")}
              </p>
              <p className="mt-2 text-sm">{log.notes}</p>
            </div>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      ))}

      {logs.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p>No investigation logs found</p>
        </div>
      )}
    </div>
  );
};