
import { Shield, Activity, Bot, Lock, Mail, CreditCard, Gift, UserCheck } from "lucide-react";
import type { Service } from "../types/services";

export const services: Service[] = [
  {
    icon: Shield,
    title: "Content Protection & Moderation",
    description: "AI-powered content analysis and moderation system to maintain platform integrity.",
    features: [
      "Advanced Content Pattern Analysis",
      "Multi-Level Verification System",
      "Auto-Moderation Rules Engine",
      "Community Management Tools",
      "Content Risk Scoring",
      "Real-Time Moderation Queue",
      "Custom Moderation Workflows",
      "Automated Content Classification"
    ]
  },
  {
    icon: Bot,
    title: "AI & Bot Defense",
    description: "Advanced system to detect and prevent automated threats and malicious AI usage.",
    features: [
      "Machine Learning Detection",
      "Behavioral Analysis Engine",
      "Traffic Pattern Recognition",
      "Bot Mitigation Rules",
      "Custom Challenge Systems",
      "Browser Fingerprinting",
      "Rate Limiting Controls",
      "Automated Response Actions"
    ]
  },
  {
    icon: UserCheck,
    title: "Identity Intelligence",
    description: "Comprehensive identity verification and fraud prevention system.",
    features: [
      "Multi-Factor Authentication",
      "Document Verification",
      "Biometric Authentication",
      "Identity Risk Scoring",
      "KYC/AML Compliance",
      "Device Trust Scoring",
      "Location Intelligence",
      "Identity Graph Analysis"
    ]
  },
  {
    icon: Lock,
    title: "API Security Suite",
    description: "Enterprise-grade API security and monitoring system.",
    features: [
      "API Authentication",
      "Rate Limiting & Quotas",
      "Request Validation",
      "Schema Enforcement",
      "Traffic Monitoring",
      "Vulnerability Detection",
      "Access Control",
      "API Usage Analytics"
    ]
  },
  {
    icon: Activity,
    title: "Transaction Guard",
    description: "Real-time transaction monitoring and fraud prevention.",
    features: [
      "Payment Fraud Detection",
      "Transaction Risk Analysis",
      "Behavior Pattern Matching",
      "Velocity Checks",
      "Amount Pattern Analysis",
      "Cross-Transaction Correlation",
      "Merchant Risk Scoring",
      "Chargeback Prevention"
    ]
  },
  {
    icon: Mail,
    title: "Communication Security",
    description: "Comprehensive email and communication channel protection.",
    features: [
      "Phishing Prevention",
      "DMARC Implementation",
      "Email Authentication",
      "Domain Protection",
      "Spam Prevention",
      "Content Filtering",
      "Link Protection",
      "Attachment Scanning"
    ]
  },
  {
    icon: Gift,
    title: "Loyalty Protection",
    description: "Advanced fraud prevention for rewards and loyalty programs.",
    features: [
      "Points Fraud Detection",
      "Account Takeover Prevention",
      "Reward Usage Analysis",
      "Multi-Account Detection",
      "Promotion Abuse Prevention",
      "Velocity Monitoring",
      "Risk-Based Authentication",
      "Transaction Verification"
    ]
  },
  {
    icon: CreditCard,
    title: "Payment Security",
    description: "End-to-end payment protection and fraud prevention system.",
    features: [
      "3D Secure Integration",
      "Card Verification",
      "Fraud Scoring Engine",
      "Payment Gateway Security",
      "PCI DSS Compliance",
      "Tokenization",
      "Secure Payment Flow",
      "Transaction Monitoring"
    ]
  }
];
