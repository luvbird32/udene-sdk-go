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
