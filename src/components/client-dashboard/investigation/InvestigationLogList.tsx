import { AlertCircle } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { LogItem } from "./components/LogItem";

type InvestigationLog = Database['public']['Tables']['service_investigation_logs']['Row'];

interface InvestigationLogListProps {
  logs: InvestigationLog[];
}

export const InvestigationLogList = ({ logs }: InvestigationLogListProps) => {
  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <LogItem key={log.id} log={log} />
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