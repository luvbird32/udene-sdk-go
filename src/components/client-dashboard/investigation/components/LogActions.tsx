import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { format } from "date-fns";
import { Database } from "@/integrations/supabase/types";

type InvestigationLog = Database['public']['Tables']['service_investigation_logs']['Row'];

interface LogActionsProps {
  log: InvestigationLog;
}

export const LogActions = ({ log }: LogActionsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium">Investigation Details</h4>
            <div className="text-sm">
              <p><strong>ID:</strong> {log.id}</p>
              <p><strong>Service ID:</strong> {log.service_id}</p>
              <p><strong>Created:</strong> {format(new Date(log.created_at || ''), "PPpp")}</p>
              <p><strong>Updated:</strong> {format(new Date(log.updated_at || ''), "PPpp")}</p>
              <p><strong>Status:</strong> {log.status}</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};