import { Shield, BotOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceIconProps {
  serviceType: string;
  isActive: boolean;
}

export const ServiceIcon = ({ serviceType, isActive }: ServiceIconProps) => {
  if (serviceType === 'bot_prevention') {
    return isActive ? (
      <Tooltip>
        <TooltipTrigger asChild>
          <Shield className="h-6 w-6 text-green-500" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Bot Protection Active</p>
        </TooltipContent>
      </Tooltip>
    ) : (
      <Tooltip>
        <TooltipTrigger asChild>
          <BotOff className="h-6 w-6 text-gray-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Bot Protection Inactive</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  return null;
};