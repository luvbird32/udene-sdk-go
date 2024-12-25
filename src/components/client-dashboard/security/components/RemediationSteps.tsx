import { Card } from "@/components/ui/card";

interface RemediationStep {
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
}

interface RemediationStepsProps {
  steps: RemediationStep[];
}

export const RemediationSteps = ({ steps }: RemediationStepsProps) => {
  return (
    <Card className="p-4">
      <h4 className="font-medium mb-2">Recommended Remediation Steps</h4>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className={`p-4 border rounded-lg ${step.severity === 'critical' ? 'border-red-500' : step.severity === 'high' ? 'border-orange-500' : step.severity === 'medium' ? 'border-yellow-500' : 'border-green-500'}`}>
            <h5 className="font-semibold">{step.title}</h5>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
