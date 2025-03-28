import { ServiceIcon } from "./ServiceIcon";
import type { ServiceHeaderProps } from "../types";

export const ServiceHeader = ({ title, description, serviceType, isActive }: ServiceHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <ServiceIcon serviceType={serviceType} isActive={isActive} />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      
      <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
        <p className="font-medium text-muted-foreground">Quick Guide:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Toggle the switch to activate/deactivate this service</li>
          <li>Configure automatic actions in the preferences below</li>
          <li>Changes take effect immediately across your account</li>
          <li>Monitor service status in your dashboard</li>
        </ul>
      </div>
    </div>
  );
};