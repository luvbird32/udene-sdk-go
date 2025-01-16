import React from 'react';
import { ServiceHeader } from './ServiceHeader';
import { ServiceList } from './ServiceList';
import { useServices } from './hooks/useServices';
import { useServiceToggle } from './hooks/useServiceToggle';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useProject } from '@/contexts/ProjectContext';

export const ServiceManager = () => {
  const { user } = useAuth();
  const { currentProject } = useProject();
  const { data: services, isLoading, error } = useServices();
  const toggleServiceMutation = useServiceToggle();

  console.log("ServiceManager - User:", user?.id);
  console.log("ServiceManager - Project:", currentProject?.id);
  console.log("ServiceManager - Services:", services);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load services. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

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

  const projectServices = services?.filter(
    service => service.project_id === currentProject?.id
  ) || [];

  const firstService = projectServices[0] || {
    service_type: 'Fraud Detection',
    is_active: false,
    description: 'Customize your fraud detection strategy'
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <ServiceHeader 
          title="Fraud Detection Services"
          description="Customize your fraud detection strategy by activating the services that best fit your needs"
          serviceType={firstService.service_type}
          isActive={firstService.is_active}
        />
        <ServiceList 
          activeServices={projectServices}
          handleToggle={(serviceType, isActive) => 
            toggleServiceMutation.mutateAsync({ 
              serviceType, 
              isActive, 
              project_id: currentProject?.id || '' 
            })
          }
        />
      </div>
    </TooltipProvider>
  );
};