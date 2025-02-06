
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const detailedExplanation = {
  processSteps: [
    "1. Data Collection: We gather device fingerprints, user behavior patterns, and transaction data",
    "2. Real-time Analysis: Our ML models process the data through multiple fraud detection layers",
    "3. Risk Assessment: Each activity receives a risk score based on multiple parameters",
    "4. Automated Response: High-risk activities trigger immediate protective actions",
    "5. Continuous Learning: Our system adapts to new fraud patterns through regular ML model updates"
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
  ],
  streamProtection: [
    "Trust Score System: Dynamic creator reputation tracking",
    "Real-time Content Analysis: Automated moderation using AI",
    "Community Reporting: Crowd-sourced content flagging",
    "Device Fingerprinting: Cross-platform account verification",
    "Appeal Management: Fair dispute resolution process"
  ]
};

export const DetailedExplanation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
          {Object.entries(detailedExplanation).map(([key, items]) => (
            <div key={key} className="glass-card p-8 rounded-xl border border-primary/20">
              <h4 className="text-xl font-semibold text-primary mb-4">
                {key.split(/(?=[A-Z])/).join(" ")}
              </h4>
              <ul className="space-y-3 text-gray-300">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
