import { Alert, AlertDescription } from "@/components/ui/alert";
import { ServiceCard } from "./ServiceCard";
import type { ClientService } from "@/integrations/supabase/types/client-services";

interface ServiceListProps {
  activeServices?: ClientService[] | null;
  handleToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceList = ({ activeServices, handleToggle }: ServiceListProps) => {
  if (!activeServices) {
    return (
      <Alert>
        <AlertDescription>
          No services available. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6">
      {activeServices.map((service) => {
        // Type guard to check if settings is an object with features array
        const settings = service.settings;
        const features = settings && 
                        typeof settings === 'object' && 
                        !Array.isArray(settings) && 
                        'features' in settings && 
                        Array.isArray(settings.features)
                          ? settings.features 
                          : [];

        return (
          <ServiceCard
            key={service.id}
            service={{
              type: service.service_type,
              isActive: service.is_active || false,
              features: features
            }}
            onToggle={async (isActive) => await handleToggle(service.service_type, isActive)}
          />
        );
      })}
    </div>
  );
};