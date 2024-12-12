import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, AlertCircle, Clock, User, FileText } from "lucide-react";
import { format } from "date-fns";
import { Database } from "@/integrations/supabase/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type InvestigationLog = Database['public']['Tables']['service_investigation_logs']['Row'];

interface InvestigationLogListProps {
  logs: InvestigationLog[];
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

  const formatFindings = (findings: any) => {
    if (!findings) return "No findings recorded";
    try {
      const findingsObj = typeof findings === 'string' ? JSON.parse(findings) : findings;
      if (typeof findingsObj === 'object' && findingsObj !== null) {
        return Object.entries(findingsObj)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
      }
      return String(findingsObj);
    } catch {
      return "Unable to parse findings";
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