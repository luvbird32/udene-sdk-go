import { Card } from "@/components/ui/card";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceDescription } from "./components/ServiceDescription";
import { ServiceFeatureList } from "./components/ServiceFeatureList";
import { ServiceControls } from "./components/ServiceControls";
import { ServiceStatus } from "./components/ServiceStatus";
import { ServiceActionPreferences } from "./components/ServiceActionPreferences";
import { useServicePreferences } from "./hooks/useServicePreferences";
import { useState } from "react";
import type { ServiceCardProps } from "./types";

export const ServiceCard = ({ service, onToggle }: ServiceCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { isUpdatingPreferences, handlePreferencesChange } = useServicePreferences(service.service_type);

  const defaultPreferences = {
    action_type: 'manual' as const,
    automatic_actions: {
      block_ip: true,
      block_device: true,
      block_user: true,
      block_email: false,
      restrict_access: false,
      notify_admin: false
    },
    notification_settings: {
      email: true,
      dashboard: true
    }
  };

  const handleToggle = async (serviceType: string, isActive: boolean) => {
    try {
      await onToggle(serviceType, isActive);
    } catch (error) {
      console.error('Error toggling service:', error);
    }
  };

  return (
    <>
      <Card className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <ServiceDescription
            title={service.service_type}
            description={service.description}
            serviceType={service.service_type}
            isActive={service.is_active}
          />
          <ServiceStatus 
            title={service.service_type}
            serviceType={service.service_type}
            isActive={service.is_active}
            onToggle={handleToggle}
          />
        </div>
        
        {service.is_active && (
          <ServiceActionPreferences
            preferences={service.action_preferences || defaultPreferences}
            onPreferencesChange={handlePreferencesChange}
            isUpdating={isUpdatingPreferences}
          />
        )}

        <ServiceFeatureList features={service.features} />
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
          description: service.description,
          features: service.features,
          type: service.service_type,
        }}
      />
    </>
  );
};