import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ServiceToggle } from "./ServiceToggle";

interface ServiceStatusProps {
  title: string;
  serviceType: string;
  isActive: boolean;
  onToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceStatus = ({
  title,
  serviceType,
  isActive,
  onToggle
}: ServiceStatusProps) => {
  const { toast } = useToast();
  const [isToggling, setIsToggling] = useState(false);

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
      console.error("Toggle error:", error);
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
    <ServiceToggle 
      isActive={isActive}
      isToggling={isToggling}
      onToggle={handleToggle}
      serviceName={title}
    />
  );
};