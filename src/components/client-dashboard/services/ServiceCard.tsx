import { Card } from "@/components/ui/card";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceDescription } from "./components/ServiceDescription";
import { ServiceFeatureList } from "./components/ServiceFeatureList";
import { ServiceControls } from "./components/ServiceControls";
import { ServiceStatus } from "./components/ServiceStatus";
import { ServiceActionPreferences } from "./components/ServiceActionPreferences";
import { useServicePreferences } from "./hooks/useServicePreferences";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  isActive: boolean;
  serviceType: string;
  onToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceCard = ({
  title,
  description,
  features,
  isActive: initialIsActive,
  serviceType,
  onToggle,
}: ServiceCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { isUpdatingPreferences, handlePreferencesChange } = useServicePreferences(serviceType);

  const { data: serviceData } = useQuery({
    queryKey: ["service-status", serviceType],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from('client_services')
        .select('is_active, action_preferences')
        .eq('user_id', user.id)
        .eq('service_type', serviceType)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const isActive = serviceData?.is_active ?? initialIsActive;

  return (
    <>
      <Card className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <ServiceDescription
            title={title}
            description={description}
            serviceType={serviceType}
            isActive={isActive}
          />
          <ServiceStatus 
            title={title}
            serviceType={serviceType}
            isActive={isActive}
            onToggle={onToggle}
          />
        </div>
        
        {isActive && (
          <ServiceActionPreferences
            preferences={serviceData?.action_preferences || {
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

        <ServiceFeatureList features={features} />
        <ServiceControls
          isActive={isActive}
          serviceType={serviceType}
          onShowDetails={() => setShowDetails(true)}
        />
      </Card>

      <ServiceDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        service={{
          title,
          description,
          features,
          type: serviceType,
        }}
      />
    </>
  );
};