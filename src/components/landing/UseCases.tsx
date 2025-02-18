
import { ShieldCheck, UserCheck, Clock, Activity, LineChart, Bell, Lock, AlertTriangle } from "lucide-react";

export const UseCases = () => {
  const useCases = [
    {
      icon: ShieldCheck,
      title: "Comprehensive Risk Management",
      description: "Enterprise-grade risk mitigation with real-time monitoring and automated response systems for maximum security",
      metrics: ["99.9% prevention rate", "Real-time protection"]
    },
    {
      icon: Lock,
      title: "Compliance Automation",
      description: "Automated compliance monitoring and reporting systems ensuring adherence to global regulatory standards",
      metrics: ["Multi-regulatory compliance", "Automated reporting"]
    },
    {
      icon: UserCheck,
      title: "Advanced Identity Verification",
      description: "Enhanced identity validation with multi-factor authentication and behavioral analysis for fraud prevention",
      metrics: ["Multi-factor verification", "Behavioral analysis"]
    },
    {
      icon: AlertTriangle,
      title: "Proactive Risk Detection",
      description: "AI-powered risk detection systems identifying and preventing threats before they impact your business",
      metrics: ["Early warning system", "AI-powered analysis"]
    },
    {
      icon: LineChart,
      title: "Risk Analytics & Reporting",
      description: "Comprehensive risk analytics and compliance reporting for informed decision-making and regulatory requirements",
      metrics: ["Real-time analytics", "Compliance reporting"]
    },
    {
      icon: Bell,
      title: "Compliance Monitoring",
      description: "24/7 automated compliance monitoring with instant alerts and detailed audit trails for regulatory adherence",
      metrics: ["Continuous monitoring", "Audit trail generation"]
    }
  ];

  return (
    <section className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-white">Enterprise-Grade </span>
            <span className="text-[#22c55e]">Risk Management & Compliance</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Comprehensive protection against threats with automated compliance monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:border-primary/30 backdrop-blur-lg border border-primary/20"
            >
              <useCase.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {useCase.description}
              </p>
              <div className="border-t border-primary/20 pt-3">
                <div className="grid grid-cols-1 gap-1.5">
                  {useCase.metrics.map((metric, idx) => (
                    <div key={idx} className="text-primary text-xs font-medium">
                      ✓ {metric}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

