import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SecurityProgram } from "@/integrations/supabase/types/security";
import { Shield, Clock } from "lucide-react";
import { format } from "date-fns";
import { getStatusColor } from "./utils/statusUtils";
import { ComplianceRequirements } from "./components/program-card/ComplianceRequirements";
import { RecentAssessments } from "./components/program-card/RecentAssessments";

interface SecurityProgramCardProps {
  program: SecurityProgram;
}

export const SecurityProgramCard = ({ program }: SecurityProgramCardProps) => {
  const { data: assessments } = useQuery({
    queryKey: ["security-assessments", program.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('security_assessments')
        .select('*')
        .eq('program_id', program.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    refetchInterval: 30000,
  });

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
        <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
      </div>

      <ComplianceRequirements requirements={program.compliance_requirements} />
      
      {assessments && <RecentAssessments assessments={assessments} />}

      {program.next_audit_date && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Next audit: {format(new Date(program.next_audit_date), 'MMM d, yyyy')}</span>
        </div>
      )}
    </Card>
  );
};