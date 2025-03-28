import { SeverityBreakdown } from "@/integrations/supabase/types/security";
import { SeverityProgress } from "./SeverityProgress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface SeverityBreakdownDisplayProps {
  severityBreakdown: SeverityBreakdown;
  totalVulnerabilities: number;
}

export const SeverityBreakdownDisplay = ({ 
  severityBreakdown, 
  totalVulnerabilities 
}: SeverityBreakdownDisplayProps) => {
  const severityDescriptions = {
    critical: "Critical vulnerabilities require immediate attention and pose significant security risks.",
    high: "High severity issues should be addressed promptly to maintain system security.",
    medium: "Medium severity vulnerabilities should be planned for remediation.",
    low: "Low severity issues should be monitored and addressed during routine maintenance."
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">Severity Breakdown</h4>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">Distribution of vulnerabilities by severity level</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="space-y-3">
        <Tooltip>
          <TooltipTrigger className="w-full">
            <SeverityProgress
              label="Critical"
              count={severityBreakdown.critical}
              total={totalVulnerabilities}
              colorClass="text-red-500"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{severityDescriptions.critical}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="w-full">
            <SeverityProgress
              label="High"
              count={severityBreakdown.high}
              total={totalVulnerabilities}
              colorClass="text-orange-500"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{severityDescriptions.high}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="w-full">
            <SeverityProgress
              label="Medium"
              count={severityBreakdown.medium}
              total={totalVulnerabilities}
              colorClass="text-yellow-500"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{severityDescriptions.medium}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="w-full">
            <SeverityProgress
              label="Low"
              count={severityBreakdown.low}
              total={totalVulnerabilities}
              colorClass="text-blue-500"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{severityDescriptions.low}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};