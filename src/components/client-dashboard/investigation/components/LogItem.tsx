
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SanitizationSteps } from "./SanitizationSteps";
import { LogActions } from "./LogActions";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, ChevronDown, ChevronUp, UserCircle } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InvestigationLog } from "@/integrations/supabase/types/investigation";
import { Json } from "@/integrations/supabase/types/core";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LogItemProps {
  log: InvestigationLog;
}

export const LogItem = ({ log }: LogItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch user profile information
  const { data: userProfile } = useQuery({
    queryKey: ['profile', log.user_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, email_verified')
        .eq('id', log.user_id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

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

  const hasSanitizationSteps = Array.isArray(log.sanitization_steps) && log.sanitization_steps.length > 0;

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Header with status and actions */}
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

        {/* User Information */}
        <div className="flex items-center gap-2 border-t border-b border-border py-2">
          <UserCircle className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">
              {userProfile?.full_name || 'User'}
              {userProfile?.username && <span className="text-muted-foreground ml-1">(@{userProfile.username})</span>}
            </p>
            <p className="text-sm text-muted-foreground">
              Case ID: {log.id.slice(0, 8)}
            </p>
          </div>
        </div>

        {/* Notes Section */}
        {log.notes && (
          <div className="bg-muted/50 rounded-md p-3">
            <p className="text-sm">{log.notes}</p>
          </div>
        )}

        {/* Findings Section */}
        {log.findings && Object.keys(log.findings).length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Key Findings</h4>
            <div className="bg-muted/50 rounded-md p-3">
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(log.findings, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Sanitization Steps */}
        {hasSanitizationSteps && (
          <div className="mt-4">
            <SanitizationSteps steps={log.sanitization_steps as Json[]} />
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-4 flex items-center justify-center gap-2 hover:bg-muted/50"
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
      </div>
    </Card>
  );
};
