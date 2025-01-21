import { Shield, BotOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

export interface ServiceIconProps {
  serviceType: string;
  isActive: boolean;
}

export const ServiceIcon = ({ serviceType, isActive }: ServiceIconProps) => {
  if (serviceType === 'bot_prevention') {
    return isActive ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Shield className="h-6 w-6 text-green-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Bot Protection Active</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <BotOff className="h-6 w-6 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Bot Protection Inactive</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return null;
};