
import { ShieldCheck, UserCheck, Clock, Activity, LineChart, Bell, Lock, AlertTriangle } from "lucide-react";

export const UseCases = () => {
  const useCases = [
    {
      icon: LineChart,
      title: "Maximize Revenue",
      description: "Prevent revenue loss from fraud while maintaining high transaction approval rates and customer satisfaction",
      metrics: ["35% revenue protection", "99.9% approval rate"]
    },
    {
      icon: Clock,
      title: "Save Time & Resources",
      description: "Automate security processes and reduce manual reviews, letting your team focus on strategic initiatives",
      metrics: ["80% less manual review", "24/7 automation"]
    },
    {
      icon: Activity,
      title: "Accelerate Growth",
      description: "Scale your business confidently with intelligent systems that adapt to your growing transaction volume",
      metrics: ["Unlimited scalability", "Real-time processing"]
    },
    {
      icon: Lock,
      title: "Ensure Privacy",
      description: "Protect sensitive data with enterprise-grade encryption and privacy-preserving authentication systems",
      metrics: ["End-to-end encryption", "GDPR compliant"]
    },
    {
      icon: ShieldCheck,
      title: "Reduce Costs",
      description: "Cut operational costs and prevent financial losses with automated threat detection and response",
      metrics: ["60% cost reduction", "Fraud loss prevention"]
    },
    {
      icon: UserCheck,
      title: "Build Trust",
      description: "Enhance customer confidence with robust security measures while maintaining a smooth experience",
      metrics: ["99.99% uptime", "Seamless security"]
    }
  ];

  return (
    <section className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-white">Drive </span>
            <span className="text-[#22c55e]">Business Growth & Efficiency</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Boost revenue, save time, and reduce costs while ensuring maximum security
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
