import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";

interface AutomaticActionToggleProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  tooltip?: string;
}

export const AutomaticActionToggle = ({
  label,
  checked,
  onCheckedChange,
  disabled = false,
  tooltip
}: AutomaticActionToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Label for the toggle switch */}
        <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>{label}</Label>
        
        {/* Optional tooltip for additional information */}
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      
      {/* Toggle switch component */}
      <Switch
        id={label.toLowerCase().replace(/\s+/g, '-')}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
};