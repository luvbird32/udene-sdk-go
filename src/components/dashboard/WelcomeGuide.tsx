
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, BookOpen, ArrowRight, CheckCircle, HelpCircle, AlertTriangle, FileText, Search, Shield, X } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: typeof Info;
  details?: string[];
}

const steps: Step[] = [
  {
    title: "Welcome to Your Security Dashboard",
    description: "This is your central hub for monitoring and managing security threats in real-time.",
    icon: BookOpen,
    details: [
      "Get real-time alerts and notifications about potential security threats",
      "View comprehensive analytics and metrics about your system's security",
      "Access detailed reports and investigation tools"
    ]
  },
  {
    title: "Understanding Detection Patterns",
    description: "Learn how our system identifies and flags suspicious activities.",
    icon: Shield,
    details: [
      "Behavioral Analysis: We monitor user patterns to detect anomalies",
      "Risk Scoring: Each activity is assigned a risk score based on multiple factors",
      "Pattern Recognition: System automatically identifies suspicious patterns across transactions"
    ]
  },
  {
    title: "Investigation Process",
    description: "Know how to review and investigate flagged activities.",
    icon: Search,
    details: [
      "Access the Investigation section to view all flagged activities",
      "Review detailed evidence and risk factors for each case",
      "Add notes and update case status as you investigate",
      "Collaborate with team members on complex cases"
    ]
  },
  {
    title: "Reports and Analytics",
    description: "Learn how to use the reporting system effectively.",
    icon: FileText,
    details: [
      "Generate custom reports based on specific criteria",
      "Schedule automated reports for regular monitoring",
      "Export data for further analysis",
      "Track trends and patterns over time"
    ]
  },
  {
    title: "Alert Management",
    description: "Configure and manage your security alerts.",
    icon: AlertTriangle,
    details: [
      "Set up custom alert rules and thresholds",
      "Configure notification preferences",
      "Manage alert priorities and escalation paths",
      "Review alert history and effectiveness"
    ]
  },
  {
    title: "Need Help?",
    description: "Access our documentation or contact support if you need assistance at any time.",
    icon: HelpCircle,
    details: [
      "Access detailed documentation for each feature",
      "Contact our 24/7 support team",
      "View video tutorials and guides",
      "Join our community forum for discussions"
    ]
  }
];

export const WelcomeGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (isDismissed && !isMinimized) {
    return (
      <Button
        className="fixed bottom-4 right-4 z-50 shadow-lg"
        onClick={() => {
          setIsDismissed(false);
          setIsMinimized(false);
        }}
      >
        <HelpCircle className="h-5 w-5 mr-2" />
        Show Guide
      </Button>
    );
  }

  const CurrentIcon = steps[currentStep].icon;

  return (
    <Card className={`${isMinimized ? 'fixed bottom-4 right-4 w-auto z-50' : 'w-full'}`}>
      <CardContent className={`p-6 space-y-6 bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent border-secondary/20 ${isMinimized ? 'hidden' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-foreground">
              {steps[currentStep].title}
            </h2>
            <p className="text-muted-foreground">
              {steps[currentStep].description}
            </p>
            {steps[currentStep].details && (
              <ul className="mt-4 space-y-2">
                {steps[currentStep].details.map((detail, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>
            <CurrentIcon className="h-5 w-5 text-secondary" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="space-x-2">
            <Button
              variant="ghost"
              onClick={() => {
                setIsDismissed(true);
                setIsMinimized(false);
              }}
            >
              Close Guide
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsMinimized(true)}
            >
              Minimize
            </Button>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  setIsDismissed(true);
                  setIsMinimized(false);
                } else {
                  setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
                }
              }}
            >
              {currentStep === steps.length - 1 ? (
                "Get Started"
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
      {isMinimized && (
        <Button 
          className="p-2" 
          variant="ghost"
          onClick={() => setIsMinimized(false)}
        >
          <HelpCircle className="h-5 w-5 mr-2" />
          Expand Guide
        </Button>
      )}
    </Card>
  );
};
