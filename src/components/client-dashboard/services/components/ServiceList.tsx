import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ServiceCard } from "./ServiceCard";
import { FRAUD_DETECTION_SERVICES } from "../config";
import { useProject } from "@/contexts/ProjectContext";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Json } from '@/types/supabase';

interface ServiceListProps {
  activeServices: any[];
  handleToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceList = ({ activeServices, handleToggle }: ServiceListProps) => {
  const { currentProject } = useProject();
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return (
      <Alert>
        <AlertDescription>
          Please sign in to manage services.
        </AlertDescription>
      </Alert>
    );
  }

  if (!currentProject) {
    return (
      <Alert>
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

        // Type guard to check if settings is an object with features array
        const settings = activeService?.settings;
        const features = settings && 
                        typeof settings === 'object' && 
                        !Array.isArray(settings) && 
                        'features' in settings && 
                        Array.isArray(settings.features)
                          ? (settings.features as string[]) 
                          : [];

        const defaultPreferences = {
          action_type: 'manual' as const,
          automatic_actions: {
            block_ip: false,
            block_device: false,
            block_user: false,
            block_email: false,
            restrict_access: false,
            notify_admin: false
          },
          notification_settings: {
            email: true,
            dashboard: true
          }
        };

        const service = {
          service_type: serviceConfig.type,
          description: serviceConfig.description,
          features: serviceConfig.features,
          is_active: activeService ? activeService.is_active : false,
          settings: activeService?.settings || {},
          action_preferences: activeService?.action_preferences || defaultPreferences
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