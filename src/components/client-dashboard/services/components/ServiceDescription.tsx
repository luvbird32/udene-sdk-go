import { Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceDescriptionProps {
  title: string;
  description: string;
  serviceType: string;
  isActive: boolean;
}

export const ServiceDescription = ({ title, description, serviceType, isActive }: ServiceDescriptionProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-primary/10 rounded-full">
        <Shield className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-sm text-white/60 mt-1 cursor-help">{description}</p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click for more details about this service</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};