import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SanitizationSteps } from "./SanitizationSteps";
import { LogActions } from "./LogActions";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InvestigationLog } from "@/integrations/supabase/types/investigation";

interface LogItemProps {
  log: InvestigationLog;
}

export const LogItem = ({ log }: LogItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "in_progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Investigation Type</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="font-medium">{log.investigation_type}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor(log.status)}>
            {log.status}
          </Badge>
          <LogActions log={log} />
        </div>
      </div>

      {log.notes && (
        <p className="mt-4 text-sm text-muted-foreground">{log.notes}</p>
      )}

      {log.sanitization_steps && log.sanitization_steps.length > 0 && (
        <div className="mt-4">
          <SanitizationSteps steps={log.sanitization_steps} />
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        className="mt-4 w-full flex items-center justify-center gap-2 hover:bg-muted/50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="h-4 w-4" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4" />
            Show More Details
          </>
        )}
      </Button>
    </Card>
  );
};