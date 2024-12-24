import { AlertTriangle } from "lucide-react";

interface RemediationStepsProps {
  steps: string[];
}

export const RemediationSteps = ({ steps }: RemediationStepsProps) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        <h4 className="text-sm font-medium">Recommended Actions</h4>
      </div>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};