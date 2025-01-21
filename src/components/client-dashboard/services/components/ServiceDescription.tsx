import { ServiceIcon } from "./ServiceIcon";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import type { ServiceHeaderProps } from "../types";

const formatServiceName = (serviceType: string): string => {
  return serviceType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const ServiceDescription = ({ title, description, serviceType, isActive }: ServiceHeaderProps) => {
  const formattedTitle = formatServiceName(serviceType);
  
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <ServiceIcon serviceType={serviceType} isActive={isActive} />
        <div>
          <h3 className="text-lg font-semibold">{formattedTitle}</h3>
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
          {serviceType === 'trial_abuse_prevention' && (
            "Our trial abuse prevention system uses advanced analytics and machine learning to detect and prevent misuse of free trials. It monitors user behavior, device fingerprints, and network patterns to identify duplicate accounts, VPN usage, and suspicious activity patterns. This helps maintain fair access to your trial offerings while preventing abuse that could impact your business."
          )}
          {serviceType === 'account_takeover_protection' && (
            "This comprehensive security service protects against unauthorized account access attempts. It uses multi-factor risk analysis, including device recognition, behavioral patterns, and location-based verification to prevent credential stuffing and brute force attacks. The system provides real-time monitoring and automated responses to suspicious login attempts."
          )}
          {serviceType === 'affiliate_abuse_prevention' && (
            "Our affiliate fraud detection system protects your affiliate program from various forms of abuse. It monitors click patterns, conversion rates, and traffic sources to identify fake referrals, cookie stuffing, and other fraudulent activities. The system helps maintain program integrity while ensuring legitimate affiliates receive their earned commissions."
          )}
          {serviceType === 'promo_code_protection' && (
            "This service prevents abuse of promotional codes through sophisticated pattern detection. It analyzes usage patterns, user behavior, and transaction characteristics to identify code sharing, bulk redemptions, and automated abuse attempts. The system helps maintain the effectiveness of your promotional campaigns while preventing unauthorized usage."
          )}
          {serviceType === 'romance_scam_detection' && (
            "Our specialized detection system identifies potential romance scams by analyzing communication patterns, behavioral indicators, and profile characteristics. It helps protect users from fraudulent relationships by monitoring for red flags such as unusual financial requests, identity inconsistencies, and suspicious interaction patterns."
          )}
          {serviceType === 'payment_fraud_detection' && (
            "This advanced fraud detection service analyzes payment transactions in real-time to identify and prevent fraudulent activities. It uses machine learning to evaluate multiple risk factors including user behavior, transaction patterns, and device characteristics. The system helps protect both your business and customers from unauthorized charges and financial fraud."
          )}
          {serviceType === 'api_security' && (
            "Our API security service provides comprehensive protection for your APIs against unauthorized access and abuse. It implements rate limiting, IP whitelisting, and sophisticated request validation to prevent API abuse, data scraping, and DDoS attacks. The system ensures your APIs remain secure and performant while serving legitimate requests."
          )}
          {serviceType === 'device_fingerprinting' && (
            "This advanced device identification service creates unique fingerprints for devices accessing your platform. It analyzes multiple device characteristics and behavioral patterns to detect suspicious activities, prevent account sharing, and identify potential fraud attempts. The system helps maintain security while providing a seamless experience for legitimate users."
          )}
          {serviceType === 'identity_verification' && (
            "Our identity verification service provides robust user authentication through multiple verification methods. It combines document verification, biometric matching, and risk assessment to ensure user authenticity. The system helps prevent identity fraud while maintaining a smooth onboarding process for legitimate users."
          )}
          {serviceType === 'stream_protection' && (
            "This comprehensive content moderation system protects your streaming platform from inappropriate content and abuse. It combines automated content analysis, user behavior monitoring, and community reporting to maintain platform safety. The system helps create a secure environment for content creators and viewers while preventing misuse."
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};