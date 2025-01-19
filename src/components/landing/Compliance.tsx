import { Shield, FileCheck, Lock, Scale, Globe, CheckCircle } from "lucide-react";

export const Compliance = () => {
  const complianceItems = [
    {
      icon: Shield,
      title: "SOC 2 Type II Certified",
      description: "Independently verified security controls and processes ensuring the highest standards of data protection"
    },
    {
      icon: FileCheck,
      title: "GDPR Compliant",
      description: "Full compliance with EU data protection regulations and privacy standards"
    },
    {
      icon: Lock,
      title: "ISO 27001 Certified",
      description: "Internationally recognized standard for information security management"
    },
    {
      icon: Scale,
      title: "PCI DSS Compliant",
      description: "Meeting all requirements for secure payment processing and data handling"
    },
    {
      icon: Globe,
      title: "Global Data Privacy",
      description: "Adherence to international data privacy regulations and standards"
    },
    {
      icon: CheckCircle,
      title: "Regular Audits",
      description: "Continuous monitoring and third-party security assessments"
    }
  ];

  return (
    <section className="relative z-10 py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Enterprise-Grade Compliance
          </h2>
          <p className="text-xl text-primary/80 max-w-3xl mx-auto">
            Meeting the highest security and regulatory standards to protect your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {complianceItems.map((item, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <item.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-primary/80 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};