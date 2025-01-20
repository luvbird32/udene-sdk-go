import { CircuitBoard, Database, Network } from "lucide-react";

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

export const TechnicalSection = () => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold text-primary mb-8 text-center">
        For Technical Teams
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {technicalSteps.map((step, index) => (
          <div key={index} className="glass-card p-8 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
              <step.icon className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-semibold text-primary mb-2">{step.title}</h4>
            <p className="text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};