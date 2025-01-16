import { Card } from '@/components/ui/card';
import { ServiceDetailsDialog } from '../ServiceDetailsDialog';
import { ServiceDescription } from './ServiceDescription';
import { ServiceFeatureList } from './ServiceFeatureList';
import { ServiceControls } from './ServiceControls';
import { ServiceStatus } from './ServiceStatus';
import { ServiceActionPreferences } from './ServiceActionPreferences';
import { useServicePreferences } from '../hooks/useServicePreferences';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import type { ClientService } from '@/integrations/supabase/types/client-services';

interface ServiceCardProps {
  service: ClientService;
  onToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceCard = ({ service, onToggle }: ServiceCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { isUpdatingPreferences, handlePreferencesChange } = useServicePreferences(service.service_type);

  return (
    <>
      <Card className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <ServiceDescription
            title={service.service_type}
            description={service.settings?.description || ''}
            serviceType={service.service_type}
            isActive={service.is_active}
          />
          <ServiceStatus 
            title={service.service_type}
            serviceType={service.service_type}
            isActive={service.is_active}
            onToggle={onToggle}
          />
        </div>
        
        {service.is_active && (
          <ServiceActionPreferences
            preferences={service.action_preferences || {
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
            }}
            onPreferencesChange={handlePreferencesChange}
            isUpdating={isUpdatingPreferences}
          />
        )}

        <ServiceFeatureList features={service.settings?.features || []} />
        <ServiceControls
          isActive={service.is_active}
          serviceType={service.service_type}
          onShowDetails={() => setShowDetails(true)}
        />
      </Card>

      <ServiceDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        service={{
          title: service.service_type,
          description: service.settings?.description || '',
          features: service.settings?.features || [],
          type: service.service_type,
        }}
      />
    </>
  );
};