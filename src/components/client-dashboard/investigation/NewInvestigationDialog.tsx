import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { InvestigationLogInsert } from "@/integrations/supabase/types/investigation";
import { InvestigationTypeSelect } from "./components/InvestigationTypeSelect";
import { InvestigationNotes } from "./components/InvestigationNotes";

interface NewInvestigationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewInvestigationDialog = ({ open, onOpenChange }: NewInvestigationDialogProps) => {
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) {
      toast({
        title: "Error",
        description: "Please select an investigation type",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: services, error: servicesError } = await supabase
        .from('client_services')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (servicesError) throw servicesError;
      if (!services) throw new Error("No active service found");

      const newLog: InvestigationLogInsert = {
        user_id: user.id,
        service_id: services.id,
        investigation_type: type,
        notes,
        status: 'pending',
        findings: {},
        sanitization_steps: [],
        manual_actions: []
      };

      const { error } = await supabase
        .from('service_investigation_logs')
        .insert(newLog);

      if (error) throw error;

      toast({
        title: "Investigation Created",
        description: "New investigation log has been created successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["investigation-logs"] });
      onOpenChange(false);
      setType("");
      setNotes("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create investigation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Investigation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InvestigationTypeSelect value={type} onValueChange={setType} />
          <InvestigationNotes value={notes} onChange={(e) => setNotes(e.target.value)} />

          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Investigation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};