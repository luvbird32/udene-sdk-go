import React from 'react';
import { Shield } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export const ServiceHeader = () => {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Shield className="h-8 w-8 text-primary cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Comprehensive fraud protection services</p>
            </TooltipContent>
          </Tooltip>
          <div>
            <h2 className="text-2xl font-bold">Fraud Detection Services</h2>
            <p className="text-muted-foreground mt-1">
              Customize your fraud detection strategy by activating the services that best fit your needs
            </p>
          </div>
        </div>
        <Badge variant="outline" className="ml-auto">
          Services Dashboard
        </Badge>
      </div>
    </TooltipProvider>
  );
};