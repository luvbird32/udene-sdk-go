import { Shield, Activity, Brain, Lock, ChartBar, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
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
    icon: Brain,
    title: "Neural Network Detection",
    description: "Advanced deep learning models for comprehensive fraud pattern recognition and risk assessment.",
    features: [
      "Multi-layer Neural Network Analysis",
      "20-Parameter Feature Engineering",
      "Real-time Risk Scoring",
      "Adaptive Learning System",
      "Pattern Recognition",
      "Behavioral Analysis",
      "Anomaly Detection"
    ]
  },
  {
    icon: Lock,
    title: "Security Monitoring",
    description: "Robust security monitoring system with automated vulnerability scanning and comprehensive threat detection.",
    features: [
      "Automated Security Assessments",
      "Device Fingerprinting",
      "IP Address Monitoring",
      "Email Change Verification",
      "Dependency Checks",
      "Real-time Alerts"
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
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
              Protection Services
            </span>
          </h2>
          <p className="text-xl text-gray-300/80 max-w-3xl mx-auto">
            Our suite of advanced protection services ensures complete coverage against various types of fraud and abuse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden p-8 bg-black/40 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
              
              <div className="relative space-y-6">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 ease-in-out">
                  <service.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-semibold text-white group-hover:text-primary/90 transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-all duration-300">
                  {service.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-white/90">Key Features:</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className="flex items-center text-gray-300 group-hover:text-gray-200"
                      >
                        <ChartBar className="w-4 h-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};