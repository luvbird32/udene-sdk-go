import React from 'react';
import { ServiceHeader } from './ServiceHeader';
import { ServiceList } from './ServiceList';
import { useServiceManager } from './useServiceManager';

export const ServiceManager = () => {
  const { activeServices, isLoading, toggleService } = useServiceManager();

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
    <div className="space-y-6">
      <ServiceHeader />
      <ServiceList 
        activeServices={activeServices} 
        handleToggle={handleToggle}
      />
    </div>
  );
};