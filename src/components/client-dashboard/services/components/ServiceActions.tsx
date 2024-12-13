import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface ServiceActionsProps {
  onShowDetails: () => void;
}

export const ServiceActions = ({ onShowDetails }: ServiceActionsProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1"
      onClick={onShowDetails}
    >
      <Info className="h-4 w-4" />
      Learn More
    </Button>
  );
};