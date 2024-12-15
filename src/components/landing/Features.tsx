import { Shield, Zap, ChartBar, Bell, Cloud, Users } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Comprehensive Protection",
      description: "Multi-layered security with AI-powered threat detection, covering everything from bot prevention to transaction monitoring"
    },
    {
      icon: Zap,
      title: "Real-time Detection",
      description: "Instant identification of suspicious activities across all services, from romance scams to affiliate fraud"
    },
    {
      icon: ChartBar,
      title: "Advanced Analytics",
      description: "Deep insights into fraud patterns with machine learning-powered risk scoring and behavioral analysis"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Intelligent notification system for suspicious activities, unusual patterns, and potential security threats"
    },
    {
      icon: Cloud,
      title: "Enterprise Integration",
      description: "Seamless integration with your existing infrastructure through our robust API and comprehensive SDKs"
    },
    {
      icon: Users,
      title: "Collaborative Security",
      description: "Built-in tools for team coordination and automated response systems for efficient threat management"
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
            Comprehensive security platform with advanced fraud detection across all business operations
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