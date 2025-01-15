/**
 * ServiceManager Component
 * 
 * Manages the activation and configuration of fraud prevention services.
 * Provides a centralized interface for managing all available services.
 */
import React from 'react';
import { ServiceHeader } from './ServiceHeader';
import { ServiceList } from './ServiceList';
import { useServices } from './hooks/useServices';
import { useServiceToggle } from './hooks/useServiceToggle';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAIActivityMonitoring } from '@/hooks/useAIActivityMonitoring';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const ServiceManager = () => {
  const { data: activeServices, isLoading } = useServices();
  const toggleService = useServiceToggle();
  const { currentProject } = useProject();
  useAIActivityMonitoring();

  const handleToggle = async (serviceType: string, isActive: boolean) => {
    if (!currentProject) {
      console.error('No project selected');
      return;
    }
    await toggleService.mutateAsync({ 
      serviceType, 
      isActive,
      project_id: currentProject.id,
      action_preferences: {
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
    });
  };

  if (!currentProject) {
    return (
      <Alert>
        <AlertDescription>
          Please select a project to manage services.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <ServiceHeader />
        <div className="grid gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-48 bg-muted/50" />
          ))}
        </div>
      </div>
    );
  }

  // Filter services by current project
  const projectServices = activeServices?.filter(
    service => service.project_id === currentProject.id
  );

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        <ServiceHeader />
        
        <Card className="p-6 bg-muted/50 border-none">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-medium">Getting Started with Services</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Each service can be activated independently to build your custom fraud prevention strategy:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Toggle services on/off at any time</li>
                  <li>Customize settings for each active service</li>
                  <li>Monitor service performance in real-time</li>
                  <li>Receive alerts for suspicious activities</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <ServiceList 
          activeServices={projectServices} 
          handleToggle={handleToggle}
        />
      </div>
    </TooltipProvider>
  );
};