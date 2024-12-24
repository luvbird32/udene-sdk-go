import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SecurityProgram } from "@/integrations/supabase/types/security";
import { Shield, AlertTriangle, Clock } from "lucide-react";
import { format } from "date-fns";

interface SecurityProgramCardProps {
  program: SecurityProgram & {
    compliance_requirements: string[];
  };
}

export const SecurityProgramCard = ({ program }: SecurityProgramCardProps) => {
  // Fetch real-time assessment data
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
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'inactive':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getPriorityBadge = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return null;
    }
  };

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

      {program.compliance_requirements && program.compliance_requirements.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Compliance Requirements</h4>
          <div className="flex flex-wrap gap-2">
            {program.compliance_requirements.map((req: string, index: number) => (
              <Badge key={index} variant="outline">{req}</Badge>
            ))}
          </div>
        </div>
      )}

      {assessments && assessments.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recent Assessments</h4>
          <div className="space-y-2">
            {assessments.slice(0, 3).map((assessment) => (
              <div key={assessment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {assessment.assessment_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  {assessment.due_date && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Due: {format(new Date(assessment.due_date), 'MMM d, yyyy')}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(assessment.risk_level)}
                  <Badge variant="outline">{assessment.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
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