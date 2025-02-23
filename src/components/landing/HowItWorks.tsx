
import { Search, ShieldCheck, Lock } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Detect",
      description: "Our advanced system scans transactions in real-time, flagging suspicious activity.",
      icon: Search,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Prevent",
      description: "AI-powered algorithms automatically block fraud before it happens.",
      icon: ShieldCheck,
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Protect",
      description: "Your business stays secure, giving you peace of mind.",
      icon: Lock,
      gradient: "from-purple-500 to-purple-600"
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

        <div className="grid gap-8 md:gap-12 lg:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5 
                       transform transition-all duration-500 hover:border-secondary/20"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-8 bg-secondary/10 px-4 py-1 rounded-full 
                          border border-secondary/20">
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
