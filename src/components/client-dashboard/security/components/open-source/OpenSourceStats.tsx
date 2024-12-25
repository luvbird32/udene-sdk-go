import { OpenSourceScan } from "@/integrations/supabase/types/security";
import { DependencyInfo } from "../DependencyInfo";
import { SeverityBreakdownDisplay } from "../SeverityBreakdownDisplay";

interface OpenSourceStatsProps {
  scan: OpenSourceScan;
  totalVulnerabilities: number;
}

export const OpenSourceStats = ({ scan, totalVulnerabilities }: OpenSourceStatsProps) => {
  return (
    <div className="space-y-4">
      <DependencyInfo dependenciesScanned={scan.dependencies_scanned} />
      <SeverityBreakdownDisplay 
        severityBreakdown={scan.severity_breakdown}
        totalVulnerabilities={totalVulnerabilities}
      />
    </div>
  );
};