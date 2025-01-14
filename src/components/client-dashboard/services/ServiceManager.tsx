/**
 * ServiceManager Component
 * 
 * Manages the activation and configuration of fraud prevention services.
 * Provides a centralized interface for managing all available services.
 * 
 * Features:
 * - Service activation/deactivation
 * - Service configuration
 * - Status monitoring
 * - Usage statistics
 * - Integration guides
 * 
 * @component
 * @example
 * ```tsx
 * <ServiceManager />
 * ```
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

export const ServiceManager = () => {
  const { data: servicesData, isLoading } = useServices();
  const toggleService = useServiceToggle();
  useAIActivityMonitoring();

  const handleToggle = async (serviceType: string, isActive: boolean) => {
    await toggleService.mutateAsync({ serviceType, isActive });
  };

  // Transform the services data to include project_id
  const activeServices = servicesData?.map(service => ({
    ...service,
    project_id: service.project_id || null // Provide a default value if project_id is missing
  })) || [];

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
          activeServices={activeServices} 
          handleToggle={handleToggle}
        />
      </div>
    </TooltipProvider>
  );
};