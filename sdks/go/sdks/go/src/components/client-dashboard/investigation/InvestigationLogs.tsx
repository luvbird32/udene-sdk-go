/**
 * InvestigationLogs Component
 * 
 * Displays a list of security investigation logs with filtering and sorting capabilities.
 * Shows investigation details, findings, and actions taken.
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { NewInvestigationDialog } from "./NewInvestigationDialog";
import { InvestigationLogList } from "./InvestigationLogList";
import { InvestigationHeader } from "./components/InvestigationHeader";
import { InvestigationInfo } from "./components/InvestigationInfo";
import { InvestigationLog } from "@/integrations/supabase/types/investigation";

interface InvestigationLogsProps {
  filterStatus?: string;
}

export const InvestigationLogs = ({ filterStatus }: InvestigationLogsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: logs, isLoading, error } = useQuery<InvestigationLog[]>({
    queryKey: ["investigation-logs", filterStatus],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      console.log("Fetching investigation logs with filter:", filterStatus);

      let query = supabase
        .from('service_investigation_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (filterStatus) {
        query = query.eq('status', filterStatus);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching logs:", error);
        toast({
          title: "Error loading logs",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading investigation logs
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <InvestigationHeader onNewInvestigation={() => setIsDialogOpen(true)} />
      <InvestigationInfo />
      <InvestigationLogList logs={logs || []} />
      
      <NewInvestigationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      />
    </Card>
  );
};