import { AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceFeatureListProps {
  features: string[];
}

export const ServiceFeatureList = ({ features }: ServiceFeatureListProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-white/60">Features:</p>
      <ul className="space-y-2">
        {features.slice(0, 3).map((feature, index) => (
          <li key={index} className="flex items-center text-sm gap-2 text-white/60">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-help">
                  <AlertCircle className="h-4 w-4 text-green-500" />
                  {feature}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Learn more about {feature.toLowerCase()}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};