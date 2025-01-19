import { ArrowRight, Shield, CircuitBoard, Database, Network, User, Check } from "lucide-react";

export const HowItWorks = () => {
  const nonTechnicalSteps = [
    {
      icon: User,
      title: "Sign Up & Connect",
      description: "Create your account and integrate Udene with your existing systems in minutes"
    },
    {
      icon: Shield,
      title: "Automatic Protection",
      description: "Our system starts monitoring for suspicious patterns and fraudulent behavior across your platform"
    },
    {
      icon: Check,
      title: "Prevent Losses",
      description: "Stop exploitation and system abuse before they impact your revenue and user experience"
    }
  ];

  const technicalSteps = [
    {
      icon: CircuitBoard,
      title: "Advanced Device Fingerprinting",
      description: "Multi-layered device identification using browser, hardware, and network signatures to track cross-platform exploitation attempts"
    },
    {
      icon: Database,
      title: "Behavioral Analysis Engine",
      description: "Real-time pattern detection using ML models to identify suspicious usage patterns and automated system manipulation"
    },
    {
      icon: Network,
      title: "Cross-Platform Protection",
      description: "Unified API endpoints with rate limiting, request validation, and automated response mechanisms to prevent fraudulent activities"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            How Udene Works
          </h2>
          <p className="text-xl text-green-300/80 max-w-3xl mx-auto">
            Simple to understand, powerful to protect
          </p>
        </div>

        {/* Non-Technical Explanation */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-green-400 mb-8 text-center">
            For Business Users
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nonTechnicalSteps.map((step, index) => (
              <div key={index} className="glass-card p-8 rounded-xl text-center relative">
                {index < nonTechnicalSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-green-400" />
                  </div>
                )}
                <div className="bg-green-500/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-xl font-semibold text-green-400 mb-2">{step.title}</h4>
                <p className="text-green-300/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Explanation */}
        <div>
          <h3 className="text-2xl font-semibold text-green-400 mb-8 text-center">
            For Technical Teams
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technicalSteps.map((step, index) => (
              <div key={index} className="glass-card p-8 rounded-xl border border-green-500/20">
                <div className="bg-green-500/10 p-4 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-xl font-semibold text-green-400 mb-2">{step.title}</h4>
                <p className="text-green-300/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};