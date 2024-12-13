import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceToggleProps {
  isActive: boolean;
  isToggling: boolean;
  onToggle: (checked: boolean) => Promise<void>;
  serviceName: string;
}

export const ServiceToggle = ({ isActive, isToggling, onToggle, serviceName }: ServiceToggleProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={isToggling ? 'opacity-50 pointer-events-none' : ''}>
          <Switch 
            checked={isActive} 
            onCheckedChange={onToggle}
            disabled={isToggling}
            className={isToggling ? 'cursor-not-allowed' : 'cursor-pointer'}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isToggling ? 'Processing...' : isActive ? 'Disable' : 'Enable'} {serviceName}</p>
      </TooltipContent>
    </Tooltip>
  );
};