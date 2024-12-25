/**
 * @component RemediationSteps
 * @description Displays a list of recommended remediation steps for addressing security vulnerabilities.
 * Each step is presented in a card format with a numbered sequence and detailed instructions.
 *
 * @param {Object} props - Component props
 * @param {string[]} props.steps - Array of remediation steps to be displayed
 *
 * @example
 * ```tsx
 * const remediationSteps = [
 *   "Update dependency X to version 2.0.0 or higher",
 *   "Enable two-factor authentication",
 *   "Review and update access controls"
 * ];
 * 
 * <RemediationSteps steps={remediationSteps} />
 * ```
 */
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface RemediationStepsProps {
  steps: string[];
}

export const RemediationSteps = ({ steps }: RemediationStepsProps) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Recommended Actions</h3>
      </div>

      <div className="space-y-2">
        {steps.map((step, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {index + 1}
              </span>
              <p className="text-sm">{step}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};