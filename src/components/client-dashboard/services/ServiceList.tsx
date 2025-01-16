import React from 'react';
import { ServiceCard } from './ServiceCard';
import { FRAUD_DETECTION_SERVICES } from './config';
import type { ClientService } from '@/integrations/supabase/types/client-services';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useProject } from '@/contexts/ProjectContext';
import { useAuth } from '@/components/auth/AuthProvider';

interface ServiceListProps {
  activeServices: ClientService[] | undefined;
  handleToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceList = ({ activeServices, handleToggle }: ServiceListProps) => {
  const { currentProject } = useProject();
  const { user } = useAuth();
  
  console.log('ServiceList rendering with:', { 
    activeServices, 
    projectId: currentProject?.id,
    userId: user?.id
  });

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please sign in to view services.
        </AlertDescription>
      </Alert>
    );
  }

  if (!currentProject) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please select a project to view available services.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {FRAUD_DETECTION_SERVICES.map((service) => {
        const isServiceActive = activeServices?.some(
          (s) => s.service_type === service.type && 
                 s.project_id === currentProject.id && 
                 s.is_active
        );

        return (
          <ServiceCard
            key={service.type}
            title={service.title}
            description={service.description}
            features={service.features}
            serviceType={service.type}
            isActive={isServiceActive || false}
            onToggle={handleToggle}
          />
        );
      })}
    </div>
  );
};