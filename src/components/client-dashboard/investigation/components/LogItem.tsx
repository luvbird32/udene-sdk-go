import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { Database } from "@/integrations/supabase/types";
import { LogActions } from "./LogActions";

type InvestigationLog = Database['public']['Tables']['service_investigation_logs']['Row'];

interface LogItemProps {
  log: InvestigationLog;
}

export const LogItem = ({ log }: LogItemProps) => {
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
    <div className="border rounded-lg p-4 hover:bg-accent transition-colors">
      <div className="flex justify-between items-start">
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-lg">{log.investigation_type}</h3>
              <Badge variant="outline" className={getStatusColor(log.status)}>
                {log.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {format(new Date(log.created_at || ''), "MMM d, yyyy 'at' HH:mm")}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Notes</h4>
              <p className="text-sm text-muted-foreground">{log.notes || "No notes provided"}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Findings</h4>
              <p className="text-sm text-muted-foreground">{formatFindings(log.findings)}</p>
            </div>
          </div>

          {Array.isArray(log.sanitization_steps) && log.sanitization_steps.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Sanitization Steps</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {log.sanitization_steps.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <LogActions log={log} />
      </div>
    </div>
  );
};