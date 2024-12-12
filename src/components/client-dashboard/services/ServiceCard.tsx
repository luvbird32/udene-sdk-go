import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceIcon } from "./components/ServiceIcon";
import { ServiceFeatures } from "./components/ServiceFeatures";
import { ServiceStatus } from "./components/ServiceStatus";

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
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = async (checked: boolean) => {
    if (isToggling) return;
    
    setIsToggling(true);
    try {
      await onToggle(serviceType, checked);
      toast({
        title: checked ? "Service activated" : "Service deactivated",
        description: `${title} has been ${checked ? "activated" : "deactivated"} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      <Card className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <ServiceIcon serviceType={serviceType} isActive={isActive} />
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
        
        <ServiceFeatures features={features} />

        <div className="flex items-center justify-between">
          <ServiceStatus isActive={isActive} serviceType={serviceType} />
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setShowDetails(true)}
          >
            <Info className="h-4 w-4" />
            Learn More
          </Button>
        </div>
      </Card>

      <ServiceDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        service={{
          title,
          description,
          features,
          type: serviceType,
        }}
      />
    </>
  );
};