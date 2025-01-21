import { Card } from "@/components/ui/card";
import { ServiceDescription } from "./ServiceDescription";
import { ServiceFeatureList } from "./ServiceFeatureList";
import { ServiceToggle } from "./ServiceToggle";
import { ServiceIcon } from "./ServiceIcon";
import { useState } from "react";

interface ServiceCardProps {
  service: {
    type: string;
    isActive: boolean;
    features: string[];
  };
  onToggle: (isActive: boolean) => Promise<void>;
}

export const ServiceCard = ({ service, onToggle }: ServiceCardProps) => {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsToggling(true);
    try {
      await onToggle(checked);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ServiceIcon serviceType={service.type} isActive={service.isActive} />
          <div>
            <h3 className="text-lg font-semibold text-white">{service.type}</h3>
          </div>
        </div>
        <ServiceToggle 
          isActive={service.isActive} 
          onToggle={handleToggle}
          isToggling={isToggling}
          serviceName={service.type}
        />
      </div>

      <ServiceDescription 
        serviceType={service.type}
        isActive={service.isActive}
      />

      <ServiceFeatureList features={service.features} />
    </Card>
  );
};