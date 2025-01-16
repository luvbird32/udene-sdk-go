import { ServiceCard } from './ServiceCard';
import { ServiceGuide } from './ServiceGuide';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/ui/states/LoadingSpinner';
import type { ClientService } from '@/integrations/supabase/types/client-services';

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
    <div className="space-y-6">
      <ServiceGuide />
      <div className="grid gap-6">
        {activeServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};