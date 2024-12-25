import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SanitizationStepsProps {
  steps: string[];
}

export const SanitizationSteps = ({ steps }: SanitizationStepsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
      >
        Sanitization Steps
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      <div className={cn(
        "mt-2 space-y-2 overflow-hidden transition-all duration-200",
        isExpanded ? "max-h-96" : "max-h-0"
      )}>
        {steps.map((step: string, index: number) => (
          <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="font-medium min-w-[24px]">{index + 1}.</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};