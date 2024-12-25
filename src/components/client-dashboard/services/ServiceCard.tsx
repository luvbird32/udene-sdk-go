/**
 * ServiceCard Component
 * 
 * Displays a card for a fraud detection service with toggle functionality,
 * description, features list, and status indicators.
 * 
 * Features:
 * - Service activation toggle
 * - Real-time status updates
 * - Feature list display
 * - Service details dialog
 * - Toast notifications for status changes
 * 
 * @component
 * @example
 * ```tsx
 * <ServiceCard
 *   title="Bot Detection"
 *   description="Detect and prevent automated attacks"
 *   features={['IP tracking', 'Behavior analysis']}
 *   isActive={true}
 *   serviceType="bot_detection"
 *   onToggle={(type, status) => handleToggle(type, status)}
 * />
 * ```
 */
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceHeader } from "./components/ServiceHeader";
import { ServiceToggle } from "./components/ServiceToggle";
import { ServiceFeatures } from "./components/ServiceFeatures";
import { ServiceStatus } from "./components/ServiceStatus";
import { ServiceActions } from "./components/ServiceActions";

interface ServiceCardProps {
  /** Title of the service */
  title: string;
  /** Description of what the service does */
  description: string;
  /** List of features provided by the service */
  features: string[];
  /** Whether the service is currently active */
  isActive: boolean;
  /** Type identifier for the service */
  serviceType: string;
  /** Callback function when service is toggled */
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
          <ServiceHeader 
            title={title}
            description={description}
            serviceType={serviceType}
            isActive={isActive}
          />
          <ServiceToggle 
            isActive={isActive}
            isToggling={isToggling}
            onToggle={handleToggle}
            serviceName={title}
          />
        </div>
        
        <ServiceFeatures features={features} />

        <div className="flex items-center justify-between">
          <ServiceStatus isActive={isActive} serviceType={serviceType} />
          <ServiceActions onShowDetails={() => setShowDetails(true)} />
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