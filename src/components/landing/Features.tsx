import { Shield, BookOpen, Computer, Lock, Zap, ChartBar, Bell, Cloud, Users } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Real-time Protection",
      description: "Instant threat detection and automated response system to protect your business 24/7"
    },
    {
      icon: Zap,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms for pattern recognition and fraud prevention"
    },
    {
      icon: ChartBar,
      title: "Advanced Analytics",
      description: "Comprehensive dashboards and reports for deep insights into security trends"
    },
    {
      icon: Bell,
      title: "Instant Alerts",
      description: "Real-time notifications and alerts for suspicious activities and potential threats"
    },
    {
      icon: Cloud,
      title: "Cloud Security",
      description: "Enterprise-grade cloud infrastructure with multiple layers of protection"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built-in tools for security team coordination and incident response"
    }
  ];

  return (
    <section className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            Enterprise-Grade Protection
          </h2>
          <p className="text-xl text-green-300/80 max-w-3xl mx-auto">
            Our comprehensive security platform provides cutting-edge protection against modern cyber threats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-green-900/20"
            >
              <feature.icon className="w-12 h-12 text-green-400 mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-green-300 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-green-300/80 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};