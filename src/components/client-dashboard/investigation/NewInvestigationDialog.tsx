import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface NewInvestigationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewInvestigationDialog = ({ open, onOpenChange }: NewInvestigationDialogProps) => {
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('service_investigation_logs')
        .insert({
          user_id: user.id,
          investigation_type: type,
          notes,
          service_id: "default", // You'll need to update this based on your needs
        });

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
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Investigation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Investigation Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="security">Security Investigation</SelectItem>
                <SelectItem value="fraud">Fraud Investigation</SelectItem>
                <SelectItem value="compliance">Compliance Review</SelectItem>
                <SelectItem value="performance">Performance Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter investigation details..."
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button type="submit">Create Investigation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};