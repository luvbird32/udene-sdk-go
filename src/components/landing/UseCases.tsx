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
      metrics: ["35ms response time", "99.9% accuracy"]
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
      metrics: ["$10M+ saved", "ROI tracking"]
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
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">Real Solutions for </span>
            <span className="text-[#22c55e]">Real Threats</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Protect your business from sophisticated fraud attempts and system exploitation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105 hover:border-primary/30 backdrop-blur-lg border border-primary/20"
            >
              <useCase.icon className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                {useCase.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {useCase.description}
              </p>
              <div className="border-t border-primary/20 pt-4">
                <div className="grid grid-cols-1 gap-2">
                  {useCase.metrics.map((metric, idx) => (
                    <div key={idx} className="text-primary text-sm font-medium">
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
