
import { CircuitBoard, Cpu, Shield, Network, LineChart } from "lucide-react";

const technicalSteps = [
  {
    icon: Shield,
    title: "Layered Security Architecture",
    description: "Multi-level security stack combining neural networks, behavioral analysis, and real-time pattern detection to create an adaptive defense system"
  },
  {
    icon: Cpu,
    title: "Neural Network Processing",
    description: "Advanced AI models analyze user behavior, transaction patterns, and system interactions in real-time to detect and prevent sophisticated fraud attempts"
  },
  {
    icon: Network,
    title: "Distributed Detection System",
    description: "Global network of detection nodes processes millions of data points per second, enabling instant threat identification and response"
  },
  {
    icon: LineChart,
    title: "Adaptive Learning Engine",
    description: "Self-improving system that continuously learns from new attack patterns and evolves protection strategies using machine learning algorithms"
  },
  {
    icon: CircuitBoard,
    title: "API-First Architecture",
    description: "Seamless integration through RESTful APIs with comprehensive SDKs, supporting real-time data processing and automated response mechanisms"
  }
];

export const TechnicalSection = () => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold text-primary mb-8 text-center">
        Technical Implementation
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicalSteps.map((step, index) => (
          <div 
            key={index} 
            className="glass-card p-6 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300 bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 mb-4 flex items-center justify-center">
              <step.icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              {step.title}
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
