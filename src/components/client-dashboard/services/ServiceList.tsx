import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import { PromoCodeValidator } from "./PromoCodeValidator";
import { useState } from "react";
import { Tables } from "@/integrations/supabase/types";

interface ServiceListProps {
  services?: Tables<'client_services'>[];
  onToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceList = ({ services, onToggle }: ServiceListProps) => {
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);

  if (!services) {
    return (
      <Card className="p-6 flex justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Available Services</h2>
        <PromoCodeValidator onValidCode={setAppliedPromoCode} />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service}
            hasPromoCode={!!appliedPromoCode}
          />
        ))}
      </div>
      
      {services.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground">
          No services available.
        </Card>
      )}
    </div>
  );
};