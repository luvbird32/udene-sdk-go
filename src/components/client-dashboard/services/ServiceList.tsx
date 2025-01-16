import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import { FRAUD_DETECTION_SERVICES } from "./config";
import { useProject } from "@/contexts/ProjectContext";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface ServiceListProps {
  activeServices: any[];
  handleToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceList = ({ activeServices, handleToggle }: ServiceListProps) => {
  const { currentProject } = useProject();
  const { user } = useAuth();
  const { toast } = useToast();

  console.log("Current user:", user?.id);
  console.log("Current project:", currentProject?.id);
  console.log("Active services:", activeServices);

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please sign in to manage services.
        </AlertDescription>
      </Alert>
    );
  }

  if (!currentProject) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please select a project to view its services.
        </AlertDescription>
      </Alert>
    );
  }

  const handleServiceToggle = async (serviceType: string, isActive: boolean) => {
    try {
      await handleToggle(serviceType, isActive);
    } catch (error) {
      console.error("Error toggling service:", error);
      toast({
        title: "Error",
        description: "Failed to update service. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {FRAUD_DETECTION_SERVICES.map((serviceConfig) => {
        const activeService = activeServices?.find(
          (s) => s.service_type === serviceConfig.type
        );

        const service = {
          service_type: serviceConfig.type,
          description: serviceConfig.description,
          features: serviceConfig.features,
          is_active: activeService ? activeService.is_active : false,
          settings: activeService?.settings || {},
          action_preferences: activeService?.action_preferences || {
            action_type: 'manual',
            automatic_actions: {
              block_ip: true,
              block_device: true,
              block_user: true
            },
            notification_settings: {
              email: true,
              dashboard: true
            }
          }
        };

        return (
          <ServiceCard
            key={service.service_type}
            service={service}
            onToggle={handleServiceToggle}
          />
        );
      })}
    </div>
  );
};