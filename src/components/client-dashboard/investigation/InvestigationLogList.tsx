import { AlertCircle, Search } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { LogItem } from "./components/LogItem";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type InvestigationLog = Database['public']['Tables']['service_investigation_logs']['Row'];

interface InvestigationLogListProps {
  logs: InvestigationLog[];
}

export const InvestigationLogList = ({ logs }: InvestigationLogListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.investigation_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search investigations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredLogs.map((log) => (
        <LogItem key={log.id} log={log} />
      ))}

      {logs.length === 0 && (
        <div className="text-center py-8 text-white/60 bg-muted/50 rounded-lg">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p className="font-medium">No investigation logs found</p>
          <p className="text-sm mt-1">
            Create a new investigation using the "New Investigation" button above.
          </p>
        </div>
      )}

      {logs.length > 0 && filteredLogs.length === 0 && (
        <div className="text-center py-8 text-white/60 bg-muted/50 rounded-lg">
          <Search className="h-8 w-8 mx-auto mb-2" />
          <p className="font-medium">No matching investigations</p>
          <p className="text-sm mt-1">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};