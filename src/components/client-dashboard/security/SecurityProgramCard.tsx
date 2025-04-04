import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, ChevronDown, ChevronUp, Info } from "lucide-react";
import { format } from "date-fns";
import { getStatusColor } from "./utils/statusUtils";
import { ComplianceRequirements } from "./components/program-card/ComplianceRequirements";
import { RecentAssessments } from "./components/program-card/RecentAssessments";
import { useState } from "react";
import { SecurityProgram } from "@/integrations/supabase/types/security";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SecurityProgramCardProps {
  program: SecurityProgram;
}

export const SecurityProgramCard = ({ program }: SecurityProgramCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const riskScore = program.risk_assessment && typeof program.risk_assessment === 'object' 
    ? (program.risk_assessment as { score?: number })?.score ?? 0
    : 0;

  return (
    <Card className="p-6 space-y-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{program.name}</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Security program to manage and monitor compliance requirements and security assessments.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">{program.description}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
          {riskScore > 0 && (
            <Tooltip>
              <TooltipTrigger>
                <Badge 
                  variant={riskScore > 70 ? "destructive" : riskScore > 30 ? "warning" : "default"}
                  className="transition-opacity hover:opacity-80"
                >
                  Risk Score: {riskScore}%
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current risk assessment score based on security controls and compliance status</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="border-t border-b py-4">
        <ComplianceRequirements 
          requirements={program.compliance_requirements || []} 
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </div>
      
      {program.security_assessments && program.security_assessments.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <span className="text-primary">Recent Security Assessments</span>
            <Badge variant="outline" className="text-xs">
              {program.security_assessments.length} Assessment{program.security_assessments.length !== 1 ? 's' : ''}
            </Badge>
          </h4>
          <RecentAssessments assessments={program.security_assessments} />
        </div>
      )}

      {program.next_audit_date && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <Clock className="h-4 w-4 text-primary" />
          <span>Next audit scheduled for: {format(new Date(program.next_audit_date), 'PPP')}</span>
        </div>
      )}

      <Button
        variant="outline"
        className="w-full mt-2 flex items-center justify-center gap-2 hover:bg-muted/50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="h-4 w-4" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4" />
            Show More Details
          </>
        )}
      </Button>
    </Card>
  );
};