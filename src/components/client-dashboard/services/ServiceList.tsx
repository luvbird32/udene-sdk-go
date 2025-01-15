/**
 * ServiceList Component
 * 
 * Displays a grid of available fraud detection services that can be activated
 * or deactivated by the user. Shows an alert when no services are active.
 * 
 * Features:
 * - Responsive grid layout of service cards
 * - Empty state handling with alert message
 * - Service activation/deactivation functionality
 * - Real-time service status updates
 * 
 * @param {Object} props
 * @param {ClientService[] | undefined} props.activeServices - Array of currently active services
 * @param {(serviceType: string, isActive: boolean) => Promise<void>} props.handleToggle - Function to toggle service status
 * 
 * @example
 * ```tsx
 * <ServiceList 
 *   activeServices={activeServices} 
 *   handleToggle={handleToggle}
 * />
 * ```
 */
import React from 'react';
import { ServiceCard } from './ServiceCard';
import { FRAUD_DETECTION_SERVICES } from './config';
import type { ClientService } from '@/integrations/supabase/types/client-services';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ServiceListProps {
  activeServices: ClientService[] | undefined;
  handleToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceList = ({ activeServices, handleToggle }: ServiceListProps) => {
  if (!activeServices?.length) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No services are currently active. Enable services above to start protecting your application.
        </AlertDescription>
      </Alert>
    );
  }

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