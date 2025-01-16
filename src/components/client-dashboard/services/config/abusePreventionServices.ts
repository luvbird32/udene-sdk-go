import { FraudDetectionService } from "@/types/services";

export const abusePreventionServices: FraudDetectionService[] = [
  {
    type: "trial_abuse_prevention",
    title: "Free Trial Prevention",
    description: "Prevent abuse of free trials through sophisticated pattern detection and user verification",
    features: [
      "Multiple trial detection",
      "Device fingerprinting",
      "IP address tracking",
      "Usage pattern analysis",
      "Risk scoring",
      "Automated blocking"
    ]
  },
  {
    type: "account_takeover_protection",
    title: "Account Takeover Protection",
    description: "Protect user accounts from unauthorized access",
    features: [
      "Login attempt monitoring",
      "Suspicious activity alerts",
      "Multi-factor authentication",
      "Session management"
    ]
  },
  {
    type: "affiliate_abuse_prevention",
    title: "Affiliate Program Protection",
    description: "Detect and prevent fraudulent affiliate program activities",
    features: [
      "Click fraud detection",
      "Conversion validation",
      "IP/Device correlation",
      "Pattern analysis",
      "Automated fraud scoring",
      "Real-time monitoring"
    ]
  },
  {
    type: "promo_code_protection",
    title: "Promo Code Abuse Prevention",
    description: "Protect against systematic abuse of promotional codes",
    features: [
      "Multiple account detection",
      "Usage pattern analysis",
      "Device fingerprinting",
      "Velocity checks",
      "Automated blocking",
      "Risk-based validation"
    ]
  },
  {
    type: "romance_scam_detection",
    title: "Romance Scam Detection",
    description: "Identify and prevent dating fraud schemes",
    features: [
      "Message pattern analysis",
      "Profile authenticity verification",
      "Behavioral red flags detection"
    ]
  },
  {
    type: "payment_fraud_detection",
    title: "Payment Fraud Detection",
    description: "Prevent fraudulent financial transactions",
    features: [
      "Transaction risk scoring",
      "Behavioral analysis",
      "Real-time monitoring"
    ]
  }
];