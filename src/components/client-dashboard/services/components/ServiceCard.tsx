import { Card } from '@/components/ui/card';
import { ServiceDetailsDialog } from '../ServiceDetailsDialog';
import { ServiceDescription } from './ServiceDescription';
import { ServiceFeatureList } from './ServiceFeatureList';
import { ServiceControls } from './ServiceControls';
import { ServiceStatus } from './ServiceStatus';
import { ServiceActionPreferences } from './ServiceActionPreferences';
import { useServicePreferences } from '../hooks/useServicePreferences';
import { useState } from 'react';
import type { ClientService } from '@/integrations/supabase/types/client-services';
import type { ServiceSettings, ServiceActionPreferences as ServiceActionPreferencesType } from '../types';

interface ServiceCardProps {
  service: ClientService;
  onToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceCard = ({ service, onToggle }: ServiceCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { isUpdatingPreferences, handlePreferencesChange } = useServicePreferences(service.service_type);
  
  const settings = service.settings as ServiceSettings;
  const actionPreferences = service.action_preferences as ServiceActionPreferencesType;

  const defaultPreferences: ServiceActionPreferencesType = {
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
  };

  // Validate and ensure actionPreferences matches the expected type
  const validatedPreferences: ServiceActionPreferencesType = 
    actionPreferences && 
    typeof actionPreferences === 'object' && 
    'action_type' in actionPreferences ? 
    actionPreferences : defaultPreferences;

  return (
    <>
      <Card className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <ServiceDescription
            title={service.service_type}
            description={settings?.description || ''}
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
            preferences={validatedPreferences}
            onPreferencesChange={handlePreferencesChange}
            isUpdating={isUpdatingPreferences}
          />
        )}

        <ServiceFeatureList features={settings?.features || []} />
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
          description: settings?.description || '',
          features: settings?.features || [],
          type: service.service_type,
        }}
      />
    </>
  );
};