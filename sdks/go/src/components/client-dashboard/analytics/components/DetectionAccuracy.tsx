import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface DetectionAccuracyProps {
  falsePositiveRate: number;
  falseNegativeRate: number;
}

export const DetectionAccuracy = ({ falsePositiveRate, falseNegativeRate }: DetectionAccuracyProps) => (
  <Card className="p-4">
    <h3 className="font-semibold mb-4">Detection Accuracy</h3>
    <div className="space-y-4">
      <TooltipProvider>
        <div>
          <div className="flex justify-between mb-2 text-red-500">
            <Tooltip>
              <TooltipTrigger className="cursor-help">
                <span>False Positive Rate</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Percentage of legitimate transactions incorrectly flagged as fraudulent</p>
              </TooltipContent>
            </Tooltip>
            <span>{falsePositiveRate.toFixed(1)}%</span>
          </div>
          <Progress value={falsePositiveRate} className="h-2 bg-red-100">
            <div className="h-full bg-red-500 transition-all" style={{ width: `${falsePositiveRate}%` }} />
          </Progress>
        </div>

        <div>
          <div className="flex justify-between mb-2 text-yellow-500">
            <Tooltip>
              <TooltipTrigger className="cursor-help">
                <span>False Negative Rate</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Percentage of fraudulent transactions incorrectly marked as legitimate</p>
              </TooltipContent>
            </Tooltip>
            <span>{falseNegativeRate.toFixed(1)}%</span>
          </div>
          <Progress value={falseNegativeRate} className="h-2 bg-yellow-100">
            <div className="h-full bg-yellow-500 transition-all" style={{ width: `${falseNegativeRate}%` }} />
          </Progress>
        </div>
      </TooltipProvider>
    </div>
  </Card>
);