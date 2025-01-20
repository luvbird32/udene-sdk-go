import { ChartBar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ServiceCardProps } from "../types/services";

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden p-8 bg-black/40 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
      
      <div className="relative space-y-6">
        <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 ease-in-out">
          <service.icon className="w-8 h-8" />
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
            {service.features.map((feature, featureIndex) => (
              <li 
                key={featureIndex}
                className="flex items-center text-gray-300 group-hover:text-gray-200"
              >
                <ChartBar className="w-4 h-4 mr-2 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};