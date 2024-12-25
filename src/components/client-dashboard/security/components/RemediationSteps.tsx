import { Card } from "@/components/ui/card";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface RemediationStep {
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
}

interface RemediationStepsProps {
  steps: RemediationStep[];
}

export const RemediationSteps = ({ steps }: RemediationStepsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50/50';
      case 'high':
        return 'border-orange-500 bg-orange-50/50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50/50';
      default:
        return 'border-green-500 bg-green-50/50';
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <h4 className="font-medium text-lg">Required Remediation Steps</h4>
      </div>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Tooltip key={index}>
            <TooltipTrigger className="w-full text-left">
              <div className={`p-4 border-l-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${getSeverityColor(step.severity)}`}>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-base mb-1">{step.title}</h5>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Click to copy this remediation step to clipboard</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
};