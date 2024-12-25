import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock } from "lucide-react";
import { format } from "date-fns";
import { getStatusColor } from "./utils/statusUtils";
import { ComplianceRequirements } from "./components/program-card/ComplianceRequirements";
import { RecentAssessments } from "./components/program-card/RecentAssessments";
import { useState } from "react";
import { SecurityProgram } from "@/integrations/supabase/types/security";

interface SecurityProgramCardProps {
  program: SecurityProgram;
}

export const SecurityProgramCard = ({ program }: SecurityProgramCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Safely handle risk assessment data
  const riskScore = program.risk_assessment && typeof program.risk_assessment === 'object' 
    ? (program.risk_assessment as { score?: number })?.score ?? 0
    : 0;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">{program.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{program.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
          {riskScore > 0 && (
            <Badge variant={riskScore > 70 ? "destructive" : riskScore > 30 ? "warning" : "default"}>
              Risk: {riskScore}%
            </Badge>
          )}
        </div>
      </div>

      <ComplianceRequirements 
        requirements={program.compliance_requirements || []} 
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      
      {program.security_assessments && program.security_assessments.length > 0 && (
        <RecentAssessments assessments={program.security_assessments} />
      )}

      {program.next_audit_date && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Next audit: {format(new Date(program.next_audit_date), 'MMM d, yyyy')}</span>
        </div>
      )}
    </Card>
  );
};