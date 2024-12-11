import React from 'react';
import { Shield } from 'lucide-react';

export const ServiceHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <Shield className="h-8 w-8 text-primary" />
      <div>
        <h2 className="text-2xl font-bold">Fraud Detection Services</h2>
        <p className="text-muted-foreground mt-1">
          Customize your fraud detection strategy by activating the services that best fit your needs
        </p>
      </div>
    </div>
  );
};