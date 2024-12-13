import { Button } from "@/components/ui/button";

interface FormActionsProps {
  setIsEditing: (editing: boolean) => void;
}

export const FormActions = ({ setIsEditing }: FormActionsProps) => {
  return (
    <div className="flex gap-4">
      <Button type="submit" className="flex-1">
        Save Changes
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => setIsEditing(false)}
        className="flex-1"
      >
        Cancel
      </Button>
    </div>
  );
};