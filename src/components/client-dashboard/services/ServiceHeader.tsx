import { ServiceIcon } from "./components/ServiceIcon";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import type { ServiceHeaderProps } from "./types";

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
      
      <Alert variant="default" className="bg-blue-50/50 border-blue-200">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-sm text-muted-foreground">
          <span className="font-medium text-blue-900">How this helps you: </span>
          {serviceType === 'bot_prevention' && (
            "Protect your platform from automated attacks and bot traffic. This service uses advanced detection to identify and block malicious automated activities while ensuring legitimate users aren't affected."
          )}
          {serviceType === 'shadow_ai_prevention' && (
            "Detect and prevent unauthorized AI system usage that could compromise your platform's security. This service monitors for suspicious AI patterns and helps maintain the integrity of your user interactions."
          )}
          {serviceType === 'payment_protection' && (
            "Safeguard your transactions with real-time fraud detection. This service analyzes payment patterns and user behavior to prevent fraudulent transactions before they occur."
          )}
          {serviceType === 'account_protection' && (
            "Prevent account takeovers and unauthorized access attempts. This service monitors login patterns and suspicious activities to keep your users' accounts secure."
          )}
          {serviceType === 'email_protection' && (
            "Guard against email-based fraud and phishing attempts. This service verifies email authenticity and protects your users from malicious email campaigns."
          )}
          {serviceType === 'reward_program_protection' && (
            "Prevent abuse and fraud in your loyalty and rewards programs. This service monitors for suspicious point accumulation and redemption patterns."
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};