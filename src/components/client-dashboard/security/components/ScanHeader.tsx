import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

interface ScanHeaderProps {
  totalVulnerabilities: number;
}

export const ScanHeader = ({ totalVulnerabilities }: ScanHeaderProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Package className="h-5 w-5 text-primary" />
      <h3 className="font-semibold">Open Source Security</h3>
    </div>
    <Badge variant={totalVulnerabilities > 0 ? "destructive" : "secondary"}>
      {totalVulnerabilities} {totalVulnerabilities === 1 ? 'vulnerability' : 'vulnerabilities'}
    </Badge>
  </div>
);