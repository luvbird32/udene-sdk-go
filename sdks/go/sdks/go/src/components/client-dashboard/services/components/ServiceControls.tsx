import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceControlsProps {
  isActive: boolean;
  serviceType: string;
  onShowDetails: () => void;
}

export const ServiceControls = ({ isActive, serviceType, onShowDetails }: ServiceControlsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger>
            <Badge 
              variant={isActive ? "default" : "secondary"}
              className="bg-transparent border hover:bg-primary/10"
            >
              {isActive ? "Active" : "Inactive"}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Service is currently {isActive ? 'active' : 'inactive'}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1"
        onClick={onShowDetails}
      >
        <Info className="h-4 w-4" />
        Learn More
      </Button>
    </div>
  );
};