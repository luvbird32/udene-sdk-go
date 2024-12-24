import { SeverityBreakdown } from "@/integrations/supabase/types/security";
import { SeverityProgress } from "./SeverityProgress";

interface SeverityBreakdownDisplayProps {
  severityBreakdown: SeverityBreakdown;
  totalVulnerabilities: number;
}

export const SeverityBreakdownDisplay = ({ 
  severityBreakdown, 
  totalVulnerabilities 
}: SeverityBreakdownDisplayProps) => {
  return (
    <div className="space-y-2">
      <SeverityProgress
        label="Critical"
        count={severityBreakdown.critical}
        total={totalVulnerabilities}
        colorClass="text-red-500"
      />
      <SeverityProgress
        label="High"
        count={severityBreakdown.high}
        total={totalVulnerabilities}
        colorClass="text-orange-500"
      />
      <SeverityProgress
        label="Medium"
        count={severityBreakdown.medium}
        total={totalVulnerabilities}
        colorClass="text-yellow-500"
      />
      <SeverityProgress
        label="Low"
        count={severityBreakdown.low}
        total={totalVulnerabilities}
        colorClass="text-blue-500"
      />
    </div>
  );
};