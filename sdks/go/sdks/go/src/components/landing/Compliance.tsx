
import { Shield, FileCheck, Lock, Scale, Globe, CheckCircle, AlertTriangle, Search, UserCheck, Bell } from "lucide-react";

export const Compliance = () => {
  const complianceItems = [
    {
      icon: Shield,
      title: "SOC 2 Type II & ISO 27001 Certified",
      description: "Independently verified security controls and comprehensive information security management systems ensuring enterprise-grade data protection"
    },
    {
      icon: FileCheck,
      title: "GDPR & Global Privacy Compliance",
      description: "Full compliance with EU data protection regulations and international privacy standards for secure data handling across borders"
    },
    {
      icon: Lock,
      title: "Advanced Risk Mitigation Systems",
      description: "Real-time threat detection and prevention with AI-powered risk scoring and automated response mechanisms"
    },
    {
      icon: Scale,
      title: "PCI DSS Level 1 Compliance",
      description: "Highest level of payment security standards compliance for secure transaction processing and sensitive data handling"
    },
    {
      icon: AlertTriangle,
      title: "Proactive Risk Management",
      description: "Continuous risk assessment and mitigation strategies with real-time monitoring and instant alerts"
    },
    {
      icon: Search,
      title: "Automated Compliance Monitoring",
      description: "24/7 automated compliance checks and controls verification with detailed audit trails"
    },
    {
      icon: UserCheck,
      title: "Identity Verification & KYC",
      description: "Robust identity verification processes meeting global regulatory requirements and fraud prevention standards"
    },
    {
      icon: Bell,
      title: "Real-time Compliance Alerts",
      description: "Instant notifications for compliance violations and suspicious activities with automated response protocols"
    }
  ];

  return (
    <section className="relative z-10 py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#22C55E] to-[#22C55E] text-transparent bg-clip-text">
            Enterprise-Grade Compliance & Risk Management
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive compliance solutions and advanced risk mitigation systems protecting your business at every level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {complianceItems.map((item, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 border border-[#22C55E]/20 hover:border-[#22C55E]/30"
            >
              <div className="bg-[#22C55E]/10 p-2 rounded-full w-fit mb-4">
                <item.icon className="w-10 h-10 text-[#22C55E]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-card p-8 rounded-xl border border-[#22C55E]/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Comprehensive Risk Mitigation Framework
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <li className="flex items-start space-x-2">
                <Shield className="w-5 h-5 text-[#22C55E] mt-1" />
                <span className="text-gray-300">Advanced Fraud Detection & Prevention</span>
              </li>
              <li className="flex items-start space-x-2">
                <Lock className="w-5 h-5 text-[#22C55E] mt-1" />
                <span className="text-gray-300">Real-time Transaction Monitoring</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-[#22C55E] mt-1" />
                <span className="text-gray-300">Automated Risk Assessment</span>
              </li>
              <li className="flex items-start space-x-2">
                <Bell className="w-5 h-5 text-[#22C55E] mt-1" />
                <span className="text-gray-300">Instant Security Alerts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
