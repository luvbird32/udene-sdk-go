import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Bot, BotOff, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  isActive: boolean;
  serviceType: string;
  onToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceCard = ({
  title,
  description,
  features,
  isActive,
  serviceType,
  onToggle,
}: ServiceCardProps) => {
  const { toast } = useToast();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async (checked: boolean) => {
    if (isToggling) return; // Prevent multiple clicks while processing
    
    setIsToggling(true);
    try {
      await onToggle(serviceType, checked);
      toast({
        title: checked ? "Service activated" : "Service deactivated",
        description: `${title} has been ${checked ? "activated" : "deactivated"} successfully.`,
      });
    } catch (error) {
      // Revert the switch state in case of error
      toast({
        title: "Error",
        description: "Failed to update service status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  const renderServiceIcon = () => {
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

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {renderServiceIcon()}
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={isToggling ? 'opacity-50 pointer-events-none' : ''}>
              <Switch 
                checked={isActive} 
                onCheckedChange={handleToggle}
                disabled={isToggling}
                className={isToggling ? 'cursor-not-allowed' : 'cursor-pointer'}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isToggling ? 'Processing...' : isActive ? 'Disable' : 'Enable'} {title}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Features:</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <AlertCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Learn more about {feature.toLowerCase()}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant={isActive ? "default" : "secondary"}
              className="mt-4 cursor-help"
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
                className="mt-4 flex items-center gap-1 cursor-help"
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
    </Card>
  );
};