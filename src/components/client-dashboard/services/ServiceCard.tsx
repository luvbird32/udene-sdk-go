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
  const [isActive, setIsActive] = useState(service.is_active);

  const handleToggle = async (serviceType: string, newActiveState: boolean) => {
    try {
      await onToggle(serviceType, newActiveState);
      setIsActive(newActiveState);
    } catch (error) {
      console.error('Error toggling service:', error);
      // State will be handled by ServiceStatus component
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
            isActive={isActive}
          />
          <ServiceStatus 
            title={service.service_type}
            serviceType={service.service_type}
            isActive={isActive}
            onToggle={handleToggle}
          />
        </div>
        
        {isActive && (
          <ServiceActionPreferences
            preferences={service.action_preferences}
            onPreferencesChange={handlePreferencesChange}
            isUpdating={isUpdatingPreferences}
          />
        )}

        <ServiceFeatureList features={service.features} />
        <ServiceControls
          isActive={isActive}
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