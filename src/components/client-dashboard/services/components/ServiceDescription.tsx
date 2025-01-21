import { formatServiceType } from '@/utils';

interface ServiceDescriptionProps {
  title: string;
  description: string;
  serviceType: string;
  isActive: boolean;
}

export const ServiceDescription = ({ 
  title,
  description,
  serviceType,
  isActive 
}: ServiceDescriptionProps) => {
  const getHowThisHelpsYou = (type: string) => {
    switch (type) {
      case 'trial_abuse_prevention':
        return "Our trial abuse prevention system uses advanced detection methods to identify and prevent multiple trial account creation, helping protect your business from users attempting to exploit free trial periods. It analyzes patterns in user behavior, device fingerprints, and network signals to maintain the integrity of your trial program while ensuring legitimate users can easily access your services.";
      case 'account_takeover_protection':
        return "This multi-layered security system protects user accounts from unauthorized access and takeover attempts. It combines behavioral biometrics, device fingerprinting, and risk-based authentication to detect suspicious login attempts, credential stuffing attacks, and account manipulation in real-time. The service also monitors for unusual account activity patterns and provides immediate alerts.";
      case 'email_security':
        return "Our email security service provides comprehensive protection against various email-based threats. It includes advanced filtering for phishing attempts, spam detection, domain spoofing prevention, and business email compromise (BEC) detection. The system uses machine learning to analyze email patterns, validate sender authenticity, and identify suspicious communication behaviors, while maintaining delivery of legitimate emails. It also monitors for unauthorized email account access and provides real-time alerts for potential security breaches.";
      case 'reward_program_protection':
        return "This specialized service safeguards your loyalty and rewards programs from abuse and fraud. It monitors point accumulation patterns, redemption behaviors, and account linking to detect multiple account abuse, point farming, and fraudulent redemptions. The system uses advanced analytics to identify coordinated fraud attempts while ensuring legitimate program participants enjoy their benefits.";
      case 'affiliate_abuse_prevention':
        return "Protect your affiliate program from fraudulent activities with our comprehensive monitoring system. It detects click fraud, fake referrals, and self-referrals while analyzing traffic patterns and conversion rates to identify suspicious behavior. The service helps maintain a healthy affiliate program by ensuring only legitimate referrals are rewarded.";
      case 'promo_code_protection':
        return "Our promo code protection service prevents abuse of your promotional campaigns. It monitors for multiple account creation, code sharing, and automated redemption attempts. The system uses advanced algorithms to detect patterns of abuse while ensuring legitimate customers can easily redeem their promotional offers.";
      case 'romance_scam_detection':
        return "This specialized detection system identifies potential romance scams by analyzing communication patterns, behavioral indicators, and financial transaction requests. It helps protect your users from fraudulent romantic connections while maintaining a safe and trustworthy platform for genuine interactions.";
      case 'payment_fraud_detection':
        return "Our comprehensive payment fraud detection system analyzes transactions in real-time to identify and prevent fraudulent activities. It uses machine learning to detect unusual patterns, suspicious behaviors, and known fraud indicators while ensuring legitimate transactions proceed smoothly.";
      case 'api_security':
        return "Protect your APIs from abuse and attacks with our comprehensive security solution. It monitors for unusual traffic patterns, rate limiting violations, and potential security threats while ensuring legitimate API usage remains unaffected. The service includes real-time monitoring and automated response capabilities.";
      case 'device_fingerprinting':
        return "Our advanced device fingerprinting service creates unique identifiers for devices accessing your system. It helps track and identify suspicious devices, prevent account sharing, and detect potential fraud attempts while maintaining user privacy and ensuring a smooth experience for legitimate users.";
      case 'identity_verification':
        return "This robust identity verification service helps ensure your users are who they claim to be. It combines multiple verification methods including document verification, biometric matching, and liveness detection to provide comprehensive identity assurance while maintaining a user-friendly verification process.";
      case 'stream_protection':
        return "Our stream protection service safeguards your streaming content from unauthorized access and abuse. It monitors for suspicious viewing patterns, account sharing, and potential content piracy while ensuring legitimate viewers enjoy uninterrupted access to your content.";
      default:
        return description;
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">
        {formatServiceType(title)}
        {isActive && (
          <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Active
          </span>
        )}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">How this helps you:</h4>
        <p className="text-sm text-muted-foreground">
          {getHowThisHelpsYou(serviceType)}
        </p>
      </div>
    </div>
  );
};