import { ServiceIcon } from "./ServiceIcon";

interface ServiceHeaderProps {
  title: string;
  description: string;
  serviceType: string;
  isActive: boolean;
}

export const ServiceHeader = ({ title, description, serviceType, isActive }: ServiceHeaderProps) => {
  return (
    <div className="flex items-start gap-3">
      <ServiceIcon serviceType={serviceType} isActive={isActive} />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};