import { Badge } from "@/components/ui/badge";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { Database } from "@/integrations/supabase/types";
import { LogActions } from "./LogActions";
import { formatFindings } from "@/components/client-dashboard/investigation/utils/logFormatters";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type InvestigationLog = Database['public']['Tables']['service_investigation_logs']['Row'];

interface LogItemProps {
  log: InvestigationLog;
}

export const LogItem = ({ log }: LogItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-green-500/10 text-green-500 border-green-500/20',
          label: 'Completed'
        };
      case 'in_progress':
        return {
          color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
          label: 'In Progress'
        };
      case 'pending':
        return {
          color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
          label: 'Pending'
        };
      default:
        return {
          color: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
          label: status
        };
    }
  };

  const statusConfig = getStatusConfig(log.status);

  return (
    <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">{log.investigation_type}</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className={statusConfig.color}>
                    {statusConfig.label}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current investigation status</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Sanitization Steps
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            <div className={cn(
              "mt-2 space-y-2 overflow-hidden transition-all duration-200",
              isExpanded ? "max-h-96" : "max-h-0"
            )}>
              {log.sanitization_steps.map((step: string, index: number) => (
                <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="font-medium min-w-[24px]">{index + 1}.</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};