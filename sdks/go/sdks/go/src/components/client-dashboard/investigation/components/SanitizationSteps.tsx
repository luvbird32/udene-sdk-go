import { Json } from "@/integrations/supabase/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SanitizationStepsProps {
  steps: Json[];
}

export const SanitizationSteps = ({ steps }: SanitizationStepsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  const formatStep = (step: Json): string => {
    if (typeof step === 'string') {
      return step;
    }
    if (typeof step === 'object' && step !== null) {
      return JSON.stringify(step);
    }
    return String(step);
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        Sanitization Steps ({steps.length})
      </button>
      
      {isExpanded && (
        <div className="mt-2 space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="text-sm text-muted-foreground pl-6">
              {index + 1}. {formatStep(step)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};