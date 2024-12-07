import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";
import type { RiskIndicator } from "@/types/risk";

interface RiskIndicatorsProps {
  indicators: RiskIndicator[];
  additionalFactors: [string, string][];
}

/**
 * Displays a list of risk indicators and additional risk factors
 */
export const RiskIndicators = ({ indicators, additionalFactors }: RiskIndicatorsProps) => {
  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-2">
        {/* Display primary risk indicators */}
        {indicators.map((indicator, index) => (
          <div key={index} className="p-2 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              {indicator.icon}
              <div>
                <p className="font-medium">{indicator.title}</p>
                <p className="text-sm text-muted-foreground">{indicator.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Display additional risk factors */}
        {additionalFactors.map(([factor, explanation]) => (
          <div key={factor} className="p-2 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-1 text-muted-foreground" />
              <div>
                <p className="font-medium">{factor}</p>
                <p className="text-sm text-muted-foreground">{explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};