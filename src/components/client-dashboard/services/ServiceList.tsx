import React from 'react';
import { ServiceCard } from './ServiceCard';
import { FRAUD_DETECTION_SERVICES } from './serviceConfig';
import type { ClientService } from '@/types/services';

interface ServiceListProps {
  activeServices: ClientService[] | undefined;
  handleToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceList = ({ activeServices, handleToggle }: ServiceListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {FRAUD_DETECTION_SERVICES.map((service) => (
        <ServiceCard
          key={service.type}
          title={service.title}
          description={service.description}
          features={service.features}
          serviceType={service.type}
          isActive={activeServices?.some(
            (s) => s.service_type === service.type && s.is_active
          ) || false}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};