import { ShieldCheck, UserCheck, Clock, Activity, LineChart, Bell } from "lucide-react";

export const UseCases = () => {
  const useCases = [
    {
      icon: ShieldCheck,
      title: "Account Protection",
      description: "Prevent account takeovers and unauthorized access with real-time monitoring and behavioral analysis",
      metrics: ["98% reduction in account fraud", "500ms response time"]
    },
    {
      icon: Activity,
      title: "Transaction Monitoring",
      description: "Detect and prevent fraudulent transactions using AI-powered risk scoring and pattern recognition",
      metrics: ["$2M+ saved monthly", "99.9% accuracy rate"]
    },
    {
      icon: UserCheck,
      title: "Identity Verification",
      description: "Verify user identities in real-time while maintaining a smooth onboarding experience",
      metrics: ["2s average verification time", "95% first-try success"]
    },
    {
      icon: Clock,
      title: "Real-time Prevention",
      description: "Stop fraud attempts before they succeed with instant detection and automated responses",
      metrics: ["<100ms response time", "24/7 protection"]
    },
    {
      icon: LineChart,
      title: "Risk Analytics",
      description: "Get deep insights into fraud patterns and risk factors with advanced analytics",
      metrics: ["Custom risk models", "Daily insights"]
    },
    {
      icon: Bell,
      title: "Alert Management",
      description: "Streamline fraud investigation with intelligent alerts and case management",
      metrics: ["90% faster resolution", "Smart prioritization"]
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
            Comprehensive protection across all critical business operations
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