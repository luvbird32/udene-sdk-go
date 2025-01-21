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
        // Safely extract features from settings
        const features = typeof service.settings === 'object' && 
                        service.settings !== null && 
                        Array.isArray(service.settings.features) 
                          ? service.settings.features 
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