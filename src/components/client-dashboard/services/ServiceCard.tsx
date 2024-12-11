import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";

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
  isActive,
  serviceType,
  onToggle,
}: ServiceCardProps) => {
  const { toast } = useToast();

  const handleToggle = async (checked: boolean) => {
    try {
      await onToggle(serviceType, checked);
      toast({
        title: checked ? "Service activated" : "Service deactivated",
        description: `${title} has been ${checked ? "activated" : "deactivated"} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <Switch checked={isActive} onCheckedChange={handleToggle} />
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Features:</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Badge 
        variant={isActive ? "default" : "secondary"}
        className="mt-4"
      >
        {isActive ? "Active" : "Inactive"}
      </Badge>
    </Card>
  );
};