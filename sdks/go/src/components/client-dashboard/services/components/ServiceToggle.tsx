import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { memo } from "react";

interface ServiceToggleProps {
  isActive: boolean;
  isToggling: boolean;
  onToggle: (checked: boolean) => Promise<void>;
  serviceName: string;
}

export const ServiceToggle = memo(({ 
  isActive, 
  isToggling, 
  onToggle, 
  serviceName 
}: ServiceToggleProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`transition-opacity duration-100 ${isToggling ? 'opacity-50' : ''}`}>
          <Switch 
            checked={isActive}
            onCheckedChange={onToggle}
            aria-label={`${isActive ? 'Disable' : 'Enable'} ${serviceName}`}
            disabled={isToggling}
            aria-disabled={isToggling}
            className={`${isToggling ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isToggling ? 'Processing...' : `${isActive ? 'Disable' : 'Enable'} ${serviceName}`}</p>
      </TooltipContent>
    </Tooltip>
  );
});

ServiceToggle.displayName = 'ServiceToggle';