
import { ChartBar, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ServiceCardProps } from "../types/services";

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialFeaturesToShow = 3; // Show first 3 features by default

  const visibleFeatures = isExpanded ? service.features : service.features.slice(0, initialFeaturesToShow);

  return (
    <Card 
      className="group relative overflow-hidden p-8 bg-black/40 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
      
      <div className="relative space-y-6">
        <div className="inline-flex p-3 rounded-lg bg-secondary/10 text-secondary group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-500 ease-in-out">
          <service.icon className="w-8 h-8 text-secondary" />
        </div>
        
        <h3 className="text-2xl font-semibold text-white group-hover:text-primary/90 transition-all duration-300">
          {service.title}
        </h3>
        
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-all duration-300">
          {service.description}
        </p>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-white/90">Key Features:</h4>
          <ul className="grid grid-cols-1 gap-2">
            {visibleFeatures.map((feature, featureIndex) => (
              <li 
                key={featureIndex}
                className="flex items-center text-gray-300 group-hover:text-gray-200"
              >
                <ChartBar className="w-4 h-4 mr-2 text-secondary" />
                {feature}
              </li>
            ))}
          </ul>
          
          {service.features.length > initialFeaturesToShow && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-4 text-primary hover:text-primary/90 gap-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  View Less
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  View More Features
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
