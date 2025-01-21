import { Card } from "@/components/ui/card";
import { ServiceDescription } from "./ServiceDescription";
import { ServiceFeatureList } from "./ServiceFeatureList";
import { ServiceToggle } from "./ServiceToggle";
import { ServiceIcon } from "./ServiceIcon";

interface ServiceCardProps {
  service: {
    type: string;
    isActive: boolean;
    features: string[];
  };
  onToggle: (isActive: boolean) => void;
}

export const ServiceCard = ({ service, onToggle }: ServiceCardProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ServiceIcon serviceType={service.type} />
          <div>
            <h3 className="text-lg font-semibold text-white">{service.type}</h3>
          </div>
        </div>
        <ServiceToggle isActive={service.isActive} onToggle={onToggle} />
      </div>

      <ServiceDescription 
        serviceType={service.type}
        isActive={service.isActive}
      />

      <ServiceFeatureList features={service.features} />
    </Card>
  );
};