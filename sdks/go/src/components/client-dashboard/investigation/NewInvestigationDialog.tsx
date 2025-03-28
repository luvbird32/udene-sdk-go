import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InvestigationTypeSelect } from "./components/InvestigationTypeSelect";
import { InvestigationNotes } from "./components/InvestigationNotes";
import { useInvestigationForm } from "@/hooks/useInvestigationForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface NewInvestigationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewInvestigationDialog = ({ open, onOpenChange }: NewInvestigationDialogProps) => {
  const {
    type,
    setType,
    notes,
    setNotes,
    isSubmitting,
    handleSubmit,
    errors,
  } = useInvestigationForm({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Investigation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors}</AlertDescription>
            </Alert>
          )}

          <InvestigationTypeSelect 
            value={type} 
            onValueChange={setType}
            error={!type && errors ? "Please select an investigation type" : undefined}
          />
          
          <InvestigationNotes 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
            maxLength={500}
            showCount
          />

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2 text-white/60">Investigation Preview</h4>
            <div className="text-sm text-white/60 space-y-2">
              <p><strong>Type:</strong> {type || "Not selected"}</p>
              <p><strong>Initial Status:</strong> Pending</p>
              <p><strong>Notes Length:</strong> {notes.length}/500 characters</p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting || !type}
            >
              {isSubmitting ? "Creating..." : "Create Investigation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};