import React from 'react';
import { ServiceHeader } from './ServiceHeader';
import { ServiceList } from './ServiceList';
import { useServiceManager } from './useServiceManager';
import { TooltipProvider } from '@/components/ui/tooltip';

export const ServiceManager = () => {
  const { activeServices, isLoading, toggleService } = useServiceManager();

  if (isLoading) {
    return <div className="grid gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-48 bg-muted rounded-lg" />
      ))}
    </div>;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        <ServiceHeader />
        <ServiceList 
          activeServices={activeServices} 
          handleToggle={toggleService}
        />
      </div>
    </TooltipProvider>
  );
};