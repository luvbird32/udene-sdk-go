import { ArrowRight, Shield, CircuitBoard, Database, Network, User, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const HowItWorks = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const detailedExplanation = {
    processSteps: [
      "1. Data Collection: We gather device fingerprints, user behavior patterns, and transaction data",
      "2. Real-time Analysis: Our ML models process the data through multiple fraud detection layers",
      "3. Risk Assessment: Each activity receives a risk score based on multiple parameters",
      "4. Automated Response: High-risk activities trigger immediate protective actions",
      "5. Continuous Learning: Our system adapts to new fraud patterns through regular model updates"
    ],
    parameters: [
      "Device Fingerprint Matching (Browser, Hardware, Network)",
      "Behavioral Pattern Analysis (Click Patterns, Navigation Speed)",
      "Transaction Velocity and Amount Patterns",
      "Geographic and Time-based Risk Factors",
      "Historical User Activity Correlation"
    ],
    mlModels: [
      "Anomaly Detection: Identifies unusual patterns in user behavior",
      "Classification Models: Categorizes transactions by risk level",
      "Pattern Recognition: Detects known fraud signatures",
      "Neural Networks: Analyzes complex relationships in user data",
      "Ensemble Methods: Combines multiple models for higher accuracy"
    ],
    aiCapabilities: [
      "Real-time Fraud Pattern Recognition",
      "Adaptive Learning from New Threat Patterns",
      "Contextual Risk Analysis",
      "Automated Decision Making",
      "Predictive Fraud Prevention"
    ]
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">Udene</span> Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Simple to understand, powerful to protect
          </p>
        </div>

        {/* Non-Technical Explanation */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-primary mb-8 text-center">
            For Business Users
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nonTechnicalSteps.map((step, index) => (
              <div key={index} className="glass-card p-8 rounded-xl text-center relative border border-primary/20 hover:border-primary/30 transition-all duration-300">
                {index < nonTechnicalSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-2">{step.title}</h4>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Explanation */}
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

        {/* Learn More Collapsible Section */}
        <div className="mt-12">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-center">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  {isOpen ? "Show Less" : "Learn More"}
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="space-y-8 mt-8">
              {/* Detailed Process */}
              <div className="glass-card p-8 rounded-xl border border-primary/20">
                <h4 className="text-xl font-semibold text-primary mb-4">Detailed Process</h4>
                <ul className="space-y-3 text-gray-300">
                  {detailedExplanation.processSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Parameters Used */}
              <div className="glass-card p-8 rounded-xl border border-primary/20">
                <h4 className="text-xl font-semibold text-primary mb-4">Key Parameters</h4>
                <ul className="space-y-3 text-gray-300">
                  {detailedExplanation.parameters.map((param, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span>{param}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ML Models */}
              <div className="glass-card p-8 rounded-xl border border-primary/20">
                <h4 className="text-xl font-semibold text-primary mb-4">Machine Learning Models</h4>
                <ul className="space-y-3 text-gray-300">
                  {detailedExplanation.mlModels.map((model, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span>{model}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Capabilities */}
              <div className="glass-card p-8 rounded-xl border border-primary/20">
                <h4 className="text-xl font-semibold text-primary mb-4">AI Capabilities</h4>
                <ul className="space-y-3 text-gray-300">
                  {detailedExplanation.aiCapabilities.map((capability, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>
  );
};