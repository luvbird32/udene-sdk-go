import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InvestigationTypeSelect } from "./components/InvestigationTypeSelect";
import { InvestigationNotes } from "./components/InvestigationNotes";
import { useInvestigationForm } from "@/hooks/useInvestigationForm";

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