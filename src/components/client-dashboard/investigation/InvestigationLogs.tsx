import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { useState } from "react";
import { NewInvestigationDialog } from "./NewInvestigationDialog";
import { InvestigationLogList } from "./InvestigationLogList";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";

type InvestigationLog = Database['public']['Tables']['service_investigation_logs']['Row'];

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

      <InvestigationLogList logs={logs || []} />
      
      <NewInvestigationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      />
    </Card>
  );
};