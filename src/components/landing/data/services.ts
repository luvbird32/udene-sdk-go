import { Shield, Activity, Bot, Lock, Mail, CreditCard, Gift, UserCheck } from "lucide-react";
import type { Service } from "../types/services";

export const services: Service[] = [
  {
    icon: Shield,
    title: "Stream Protection & Content Moderation",
    description: "Comprehensive content moderation and stream protection with AI-powered analysis and community-driven reporting.",
    features: [
      "Trust Score System for Content Creators",
      "Real-time Stream Monitoring",
      "Community-driven Reporting System",
      "Automated Content Moderation",
      "Fake Account Prevention",
      "Device Fingerprinting",
      "IP Analysis and Restrictions",
      "Community Moderation Tools"
    ]
  },
  {
    icon: Bot,
    title: "Bot & AI Protection",
    description: "Advanced detection and prevention of automated threats and shadow AI usage.",
    features: [
      "Bot Detection",
      "Shadow AI Detection",
      "Behavioral Analysis",
      "Pattern Recognition",
      "Real-time Monitoring",
      "AI Pattern Detection",
      "LLM Usage Monitoring",
      "Prompt Injection Prevention"
    ]
  },
  {
    icon: UserCheck,
    title: "Identity Verification",
    description: "Multi-factor identity verification system with advanced biometric authentication.",
    features: [
      "Document Verification",
      "Biometric Authentication",
      "Identity Scoring",
      "Fraud Prevention",
      "Real-time Verification",
      "Face Matching Technology",
      "Document Authenticity Check"
    ]
  },
  {
    icon: Lock,
    title: "Security & API Protection",
    description: "Robust security monitoring system with API protection and comprehensive threat detection.",
    features: [
      "API Security & Rate Limiting",
      "Device Fingerprinting",
      "IP Address Monitoring",
      "Email Change Verification",
      "Dependency Checks",
      "Real-time Alerts",
      "Access Control"
    ]
  },
  {
    icon: Activity,
    title: "Fraud Prevention",
    description: "Comprehensive fraud prevention suite protecting against various types of fraudulent activities.",
    features: [
      "Account Takeover Protection",
      "Transaction Monitoring",
      "Romance Scam Detection",
      "Affiliate Fraud Protection",
      "Trial Abuse Prevention",
      "Promo Code Protection"
    ]
  },
  {
    icon: Mail,
    title: "Email Security",
    description: "Advanced email security and phishing protection system.",
    features: [
      "Email Authentication",
      "Phishing Detection",
      "Domain Monitoring",
      "DMARC Enforcement",
      "Spoofing Prevention",
      "Email Pattern Analysis"
    ]
  },
  {
    icon: Gift,
    title: "Reward Program Protection",
    description: "Prevent fraud and abuse in your loyalty and rewards programs.",
    features: [
      "Real-time monitoring of reward transactions",
      "Detection of suspicious point accumulation",
      "Prevention of reward program abuse",
      "Automated risk scoring",
      "Velocity checks",
      "Pattern analysis"
    ]
  },
  {
    icon: CreditCard,
    title: "Payment Protection",
    description: "Detect and prevent fraudulent payment transactions with real-time monitoring.",
    features: [
      "Real-time transaction monitoring",
      "Risk scoring and analysis",
      "Automated fraud detection",
      "Payment pattern analysis",
      "Behavioral analysis",
      "Velocity checks"
    ]
  }
];