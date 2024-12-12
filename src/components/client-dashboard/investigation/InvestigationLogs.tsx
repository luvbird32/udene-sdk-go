import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Info } from "lucide-react";
import { useState } from "react";
import { NewInvestigationDialog } from "./NewInvestigationDialog";
import { InvestigationLogList } from "./InvestigationLogList";
import { useToast } from "@/components/ui/use-toast";
import { InvestigationLog } from "@/integrations/supabase/types/investigation";

export const InvestigationLogs = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: logs, isLoading, error } = useQuery<InvestigationLog[]>({
    queryKey: ["investigation-logs"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('service_investigation_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Investigation Logs</h2>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Investigation
        </Button>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-medium">About Investigation Logs</h3>
            <p className="text-sm text-muted-foreground">
              Investigation logs help you track and document security investigations, fraud analysis, and compliance reviews. 
              Each log includes:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside ml-4 space-y-1">
              <li>Investigation type and current status</li>
              <li>Detailed findings and observations</li>
              <li>Sanitization steps taken</li>
              <li>Manual actions performed</li>
              <li>Timestamps for audit trails</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Use the "New Investigation" button to create a new log when starting an investigation.
            </p>
          </div>
        </div>
      </div>

      <InvestigationLogList logs={logs || []} />
      
      <NewInvestigationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      />
    </Card>
  );
};