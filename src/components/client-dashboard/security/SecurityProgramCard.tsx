import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { SecurityProgram } from "@/integrations/supabase/types/security";

interface SecurityProgramProps {
  program: SecurityProgram;
}

export const SecurityProgramCard = ({ program }: SecurityProgramProps) => {
  const riskAssessment = program.risk_assessment as { level?: string; score?: number } | null;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-lg font-semibold">{program.name}</h3>
            <p className="text-sm text-muted-foreground">{program.description}</p>
          </div>
        </div>
        <Badge variant={program.status === 'active' ? "default" : "secondary"}>
          {program.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Last Audit: {
              program.last_audit_date 
                ? formatDistanceToNow(new Date(program.last_audit_date), { addSuffix: true })
                : 'Not audited yet'
            }</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Next Audit: {
              program.next_audit_date
                ? formatDistanceToNow(new Date(program.next_audit_date), { addSuffix: true })
                : 'Not scheduled'
            }</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>Risk Level: {riskAssessment?.level || 'Not assessed'}</span>
          </div>
          {riskAssessment?.score !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Risk Score: {riskAssessment.score}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};