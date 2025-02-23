
import { Bot, Shield, Lock, CreditCard } from "lucide-react";
import type { Service } from "../types/services";

export const services: Service[] = [
  {
    icon: Shield,
    title: "Real-Time AI Fraud Detection",
    description: "Our AI-powered platform prevents fraud across your entire business with advanced behavioral analysis.",
    features: [
      "Behavioral AI: Predicts fraudulent actions before they happen",
      "Device Intelligence: Tracks over 100+ unique signals to stop repeat offenders",
      "Cross-Platform Protection: Secures web, mobile, and APIs with one system"
    ]
  },
  {
    icon: CreditCard,
    title: "Payment & Transaction Security",
    description: "Comprehensive payment protection with instant fraud detection and prevention.",
    features: [
      "Instant fraud detection for payments, chargebacks, and reward programs",
      "Stops fake transactions, stolen cards, and refund abuse",
      "PCI DSS & 3D Secure compliance ensures safe transactions"
    ]
  },
  {
    icon: Bot,
    title: "Bot & API Defense",
    description: "Advanced protection against automated threats and unauthorized access attempts.",
    features: [
      "Stops automated attacks & AI-driven fraud",
      "Blocks bot abuse, scraping, and unauthorized API access",
      "Prevents credential stuffing, fake signups, and spam"
    ]
  },
  {
    icon: Lock,
    title: "Account & Identity Protection",
    description: "Comprehensive identity verification and account security system.",
    features: [
      "Prevents fake accounts & multi-account abuse",
      "Advanced device fingerprinting detects shared credentials",
      "Biometric authentication & document verification"
    ]
  }
];
