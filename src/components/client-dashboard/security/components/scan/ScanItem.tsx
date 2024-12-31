import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { VulnerabilityScan } from "../../types";
import { ScanHeader } from "../shared/ScanHeader";
import { ScanStats } from "../shared/ScanStats";
import { FindingDetails } from "../vulnerability/FindingDetails";

interface ScanItemProps {
  scan: VulnerabilityScan;
}

export const ScanItem = ({ scan }: ScanItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-4 space-y-4">
      <ScanHeader 
        scanType={scan.scan_type}
        startTime={scan.start_time}
        endTime={scan.end_time}
        totalVulnerabilities={scan.total_vulnerabilities}
        status={scan.status}
      />

      <ScanStats 
        status={scan.status}
        totalVulnerabilities={scan.total_vulnerabilities}
        severityBreakdown={scan.severity_breakdown}
        endTime={scan.end_time}
      />

      {scan.findings && scan.findings.length > 0 && (
        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 mr-2" />
          ) : (
            <ChevronDown className="h-4 w-4 mr-2" />
          )}
          {isExpanded ? "Hide" : "Show"} Detailed Findings
        </Button>
      )}

      {isExpanded && scan.findings && (
        <div className="space-y-4 mt-4 border-t pt-4">
          {scan.findings.map((finding) => (
            <FindingDetails key={finding.id} finding={finding} />
          ))}
        </div>
      )}
    </Card>
  );
};