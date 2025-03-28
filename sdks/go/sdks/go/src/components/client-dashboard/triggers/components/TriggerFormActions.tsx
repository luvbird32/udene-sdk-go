import { Button } from "@/components/ui/button";

interface TriggerFormActionsProps {
  onSubmit: () => void;
  isLoading: boolean;
  isValid: boolean;
  selectedEventTypesCount: number;
}

export const TriggerFormActions = ({
  onSubmit,
  isLoading,
  isValid,
  selectedEventTypesCount
}: TriggerFormActionsProps) => {
  return (
    <Button 
      onClick={onSubmit}
      disabled={!isValid || isLoading}
      className="w-full"
    >
      {isLoading ? "Creating..." : `Create Trigger${selectedEventTypesCount > 1 ? 's' : ''}`}
    </Button>
  );
};