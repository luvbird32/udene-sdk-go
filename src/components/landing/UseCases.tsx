import { ShieldCheck, UserCheck, Clock, Activity, LineChart, Bell } from "lucide-react";

export const UseCases = () => {
  const useCases = [
    {
      icon: ShieldCheck,
      title: "Account Protection",
      description: "Prevent account takeovers with real-time behavioral monitoring and multi-factor device fingerprinting",
      metrics: ["500ms response time", "99.9% accuracy rate"]
    },
    {
      icon: Activity,
      title: "Transaction Monitoring",
      description: "Detect fraudulent transactions using ML-powered risk scoring and advanced pattern recognition",
      metrics: ["Real-time processing", "Custom risk models"]
    },
    {
      icon: UserCheck,
      title: "Identity Verification",
      description: "Comprehensive identity validation with document verification and advanced risk assessment",
      metrics: ["Multiple verification methods", "Automated validation"]
    },
    {
      icon: Clock,
      title: "Real-time Prevention",
      description: "Stop fraud attempts instantly with automated response systems and continuous monitoring",
      metrics: ["24/7 protection", "Instant alerts"]
    },
    {
      icon: LineChart,
      title: "Risk Analytics",
      description: "Deep insights into fraud patterns with ML-powered analysis and custom risk modeling",
      metrics: ["Advanced ML models", "Pattern recognition"]
    },
    {
      icon: Bell,
      title: "Alert Management",
      description: "Intelligent alert system with automated prioritization and comprehensive case management",
      metrics: ["Smart prioritization", "Custom alert rules"]
    }
  ];

  return (
    <section className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            Fraud Prevention Use Cases
          </h2>
          <p className="text-xl text-green-300/80 max-w-3xl mx-auto">
            Enterprise-grade protection across all critical business operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-green-900/20"
            >
              <useCase.icon className="w-12 h-12 text-green-400 mb-6" />
              <h3 className="text-2xl font-semibold text-green-300 mb-4">
                {useCase.title}
              </h3>
              <p className="text-green-300/80 mb-6 leading-relaxed">
                {useCase.description}
              </p>
              <div className="border-t border-green-500/20 pt-4">
                <div className="grid grid-cols-1 gap-2">
                  {useCase.metrics.map((metric, idx) => (
                    <div key={idx} className="text-green-400 text-sm font-medium">
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