
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, BookOpen, ArrowRight, CheckCircle, HelpCircle } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: typeof Info;
}

const steps: Step[] = [
  {
    title: "Welcome to Your Security Dashboard",
    description: "This is your central hub for monitoring and managing security threats in real-time.",
    icon: BookOpen
  },
  {
    title: "Monitor Key Metrics",
    description: "Track essential security metrics, fraud detection rates, and system performance at a glance.",
    icon: Info
  },
  {
    title: "Configure Your Services",
    description: "Enable and customize security services to protect your business from various threats.",
    icon: CheckCircle
  },
  {
    title: "Need Help?",
    description: "Access our documentation or contact support if you need assistance at any time.",
    icon: HelpCircle
  }
];

export const WelcomeGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <Card className="p-6 mb-6 bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent border-secondary/20">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-foreground">
              {steps[currentStep].title}
            </h2>
            <p className="text-muted-foreground">
              {steps[currentStep].description}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>
            {steps[currentStep].icon && (
              <steps[currentStep].icon className="h-5 w-5 text-secondary" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button
            variant="ghost"
            onClick={() => setIsDismissed(true)}
          >
            Skip Guide
          </Button>
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
      </div>
    </Card>
  );
};
