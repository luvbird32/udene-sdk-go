import { Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceStatusProps {
  isActive: boolean;
  serviceType: string;
}

export const ServiceStatus = ({ isActive, serviceType }: ServiceStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant={isActive ? "default" : "secondary"}
            className="cursor-help"
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Service is currently {isActive ? 'active' : 'inactive'}</p>
        </TooltipContent>
      </Tooltip>
      
      {serviceType === 'bot_prevention' && isActive && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 cursor-help"
            >
              <Bot className="h-3 w-3" />
              Bot Protection Active
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Real-time bot detection is enabled</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};