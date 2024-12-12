import React from 'react';
import { ServiceHeader } from './ServiceHeader';
import { ServiceList } from './ServiceList';
import { useServices } from './hooks/useServices';
import { useServiceToggle } from './hooks/useServiceToggle';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAIActivityMonitoring } from '@/hooks/useAIActivityMonitoring';

export const ServiceManager = () => {
  const { data: activeServices, isLoading } = useServices();
  const toggleService = useServiceToggle();
  useAIActivityMonitoring();

  if (isLoading) {
    return <div className="grid gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-48 bg-muted rounded-lg" />
      ))}
    </div>;
  }

  const handleToggle = async (serviceType: string, isActive: boolean) => {
    await toggleService.mutateAsync({ serviceType, isActive });
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        <ServiceHeader />
        <ServiceList 
          activeServices={activeServices} 
          handleToggle={handleToggle}
        />
      </div>
    </TooltipProvider>
  );
};