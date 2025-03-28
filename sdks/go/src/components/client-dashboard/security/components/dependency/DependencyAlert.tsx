import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, AlertOctagon } from "lucide-react";

interface Vulnerability {
  id: string;
  package_name: string;
  current_version: string;
  recommended_version: string;
  severity: string;
  description?: string;
  cve_id?: string;
}

interface DependencyAlertProps {
  vulnerability: Vulnerability;
}

export const DependencyAlert = ({ vulnerability }: DependencyAlertProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <AlertOctagon className="h-4 w-4" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-4 border-l-4 border-l-red-500">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{vulnerability.package_name}</h4>
            <Badge className={getSeverityColor(vulnerability.severity)}>
              {getSeverityIcon(vulnerability.severity)}
              <span className="ml-1">{vulnerability.severity}</span>
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Current: {vulnerability.current_version} → Recommended: {vulnerability.recommended_version}
          </p>
          {vulnerability.description && (
            <p className="text-sm text-muted-foreground">{vulnerability.description}</p>
          )}
          {vulnerability.cve_id && (
            <p className="text-xs font-mono bg-muted p-1 rounded inline-block">
              {vulnerability.cve_id}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};