import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, XCircle } from "lucide-react";

interface ServiceStatusProps {
  label: string;
  isConnected: boolean;
  tooltipContent: string;
}

export const ServiceStatus = ({ label, isConnected, tooltipContent }: ServiceStatusProps) => {
  const getStatusColor = (isConnected: boolean) => {
    return isConnected ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500";
  };

  const getStatusIcon = (isConnected: boolean) => {
    return isConnected ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />;
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{label}</span>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Badge variant="outline" className={getStatusColor(isConnected)}>
        {getStatusIcon(isConnected)}
        <span className="ml-2">{isConnected ? "Connected" : "Disconnected"}</span>
      </Badge>
    </div>
  );
};