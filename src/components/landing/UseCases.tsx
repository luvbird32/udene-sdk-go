import { ShieldCheck, UserCheck, Clock, Activity, LineChart, Bell } from "lucide-react";

export const UseCases = () => {
  const useCases = [
    {
      icon: ShieldCheck,
      title: "Free Trial Protection",
      description: "Stop users from abusing your free trial system with our industry-leading pattern detection and cross-platform tracking",
      metrics: ["99.9% prevention rate", "35ms response time"]
    },
    {
      icon: Activity,
      title: "Account Protection",
      description: "Prevent account takeovers and unauthorized access with real-time behavioral monitoring and risk assessment",
      metrics: ["500ms response time", "99.9% accuracy"]
    },
    {
      icon: UserCheck,
      title: "Identity Verification",
      description: "Advanced identity validation that stops fraudsters while maintaining a smooth experience for legitimate users",
      metrics: ["2-factor verification", "Behavioral analysis"]
    },
    {
      icon: Clock,
      title: "Real-time Prevention",
      description: "Stop exploitation attempts instantly with automated response systems and continuous monitoring",
      metrics: ["24/7 protection", "Instant blocking"]
    },
    {
      icon: LineChart,
      title: "Revenue Protection",
      description: "Protect your bottom line from fraud and abuse with comprehensive financial loss prevention",
      metrics: ["10M+ saved", "ROI tracking"]
    },
    {
      icon: Bell,
      title: "Early Warning System",
      description: "Detect and respond to new fraud patterns before they can impact your business at scale",
      metrics: ["Proactive alerts", "Pattern learning"]
    }
  ];

  return (
    <section className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            Real Solutions for Real Threats
          </h2>
          <p className="text-xl text-green-300/80 max-w-3xl mx-auto">
            Protect your business from sophisticated fraud attempts and system exploitation
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