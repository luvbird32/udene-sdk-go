import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useServiceToggle } from "./hooks/useServiceToggle";
import { Tables } from "@/integrations/supabase/types";

interface ServiceCardProps {
  service: Tables<'client_services'>;
  hasPromoCode?: boolean;
}

export const ServiceCard = ({ service, hasPromoCode }: ServiceCardProps) => {
  const { mutate: toggleService, isLoading } = useServiceToggle();

  const handleToggle = (checked: boolean) => {
    toggleService({ serviceType: service.service_type, isActive: checked });
  };

  const serviceSettings = service.settings as { description?: string } | null;

  return (
    <Card className="relative">
      {hasPromoCode && (
        <Badge 
          className="absolute top-2 right-2 bg-green-500 hover:bg-green-600"
        >
          Promo Applied
        </Badge>
      )}
      <CardHeader>
        <CardTitle>{service.service_type}</CardTitle>
        <CardDescription>
          {serviceSettings?.description || "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Service ID: {service.id}</span>
          <span className="text-sm text-muted-foreground">Status: {service.is_active ? "Active" : "Inactive"}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {service.is_active ? "Enabled" : "Disabled"}
        </span>
        <Switch
          checked={service.is_active}
          onCheckedChange={handleToggle}
          disabled={isLoading}
        />
      </CardFooter>
    </Card>
  );
};