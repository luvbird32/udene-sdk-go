import { Clock } from "lucide-react";
import { format } from "date-fns";
import { Database } from "@/integrations/supabase/types";
import { LogActions } from "./LogActions";
import { formatFindings } from "@/components/client-dashboard/investigation/utils/logFormatters";
import { StatusBadge } from "./StatusBadge";
import { SanitizationSteps } from "./SanitizationSteps";

type InvestigationLog = Database['public']['Tables']['service_investigation_logs']['Row'];

interface LogItemProps {
  log: InvestigationLog;
}

export const LogItem = ({ log }: LogItemProps) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">{log.investigation_type}</h3>
            <StatusBadge status={log.status} />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {format(new Date(log.created_at || ''), "MMM d, yyyy 'at' HH:mm")}
            </div>
            <LogActions log={log} />
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
          <SanitizationSteps steps={log.sanitization_steps} />
        )}
      </div>
    </div>
  );
};