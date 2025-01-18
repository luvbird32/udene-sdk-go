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
            "Our advanced bot detection system uses machine learning to identify and block automated threats in real-time. It analyzes behavioral patterns, request signatures, and network characteristics to distinguish between legitimate users and malicious bots, protecting your platform from scraping, credential stuffing, and DDoS attacks while maintaining a smooth experience for real users."
          )}
          {serviceType === 'shadow_ai_prevention' && (
            "This service employs sophisticated detection algorithms to identify unauthorized AI system usage on your platform. It monitors request patterns, content generation signatures, and API usage to detect potential AI-powered automation tools, ensuring fair usage and preventing abuse of your resources. The system adapts to new AI patterns while minimizing false positives."
          )}
          {serviceType === 'payment_protection' && (
            "Our comprehensive payment fraud prevention system analyzes multiple risk factors in real-time, including transaction patterns, user behavior, and device fingerprints. It uses advanced machine learning models to detect suspicious patterns, validate payment information, and prevent chargebacks while ensuring legitimate transactions are processed smoothly."
          )}
          {serviceType === 'account_protection' && (
            "This multi-layered security system protects user accounts from unauthorized access and takeover attempts. It combines behavioral biometrics, device fingerprinting, and risk-based authentication to detect suspicious login attempts, credential stuffing attacks, and account manipulation in real-time. The service also monitors for unusual account activity patterns and provides immediate alerts."
          )}
          {serviceType === 'email_protection' && (
            "Our email security service uses advanced algorithms to detect and prevent various forms of email-based fraud. It validates email authenticity, checks for domain spoofing, analyzes sender reputation, and identifies phishing attempts. The system also monitors for business email compromise (BEC) attacks and provides detailed threat intelligence."
          )}
          {serviceType === 'reward_program_protection' && (
            "This specialized service safeguards your loyalty and rewards programs from abuse and fraud. It monitors point accumulation patterns, redemption behaviors, and account linking to detect multiple account abuse, point farming, and fraudulent redemptions. The system uses advanced analytics to identify coordinated fraud attempts while ensuring legitimate program participants enjoy their benefits."
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};