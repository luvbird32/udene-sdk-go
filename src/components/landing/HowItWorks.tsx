
import { Search, ShieldCheck, Lock } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Detect",
      description: "Our advanced system scans transactions in real-time, flagging suspicious activity.",
      icon: Search,
      gradient: "from-secondary to-secondary/80"
    },
    {
      id: 2,
      title: "Prevent",
      description: "AI-powered algorithms automatically block fraud before it happens.",
      icon: ShieldCheck,
      gradient: "from-secondary to-secondary/80"
    },
    {
      id: 3,
      title: "Protect",
      description: "Your business stays secure, giving you peace of mind.",
      icon: Lock,
      gradient: "from-secondary to-secondary/80"
    }
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            How <span className="text-secondary">Udene</span> Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:border-primary/30 backdrop-blur-lg border border-primary/20"
            >
              {/* Step Number */}
              <div className="bg-secondary/10 px-4 py-1 rounded-full border border-secondary/20 w-fit mb-6">
                <span className="text-secondary font-medium">Step {step.id}</span>
              </div>

              {/* Icon */}
              <div className={`mb-6 p-4 rounded-lg bg-gradient-to-br ${step.gradient} 
                           w-fit transform transition-transform duration-300 hover:scale-110`}>
                <step.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-white/80">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
