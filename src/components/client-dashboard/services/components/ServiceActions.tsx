/**
 * ServiceActions Component
 * 
 * Provides action buttons for managing fraud detection services, including
 * options to view detailed information and configure service settings.
 * 
 * Features:
 * - "Learn More" button with icon
 * - Ghost variant styling for subtle UI integration
 * - Consistent button sizing and spacing
 * 
 * @param {Object} props
 * @param {() => void} props.onShowDetails - Callback function to show service details dialog
 * 
 * @example
 * ```tsx
 * <ServiceActions onShowDetails={() => setShowDetails(true)} />
 * ```
 */
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