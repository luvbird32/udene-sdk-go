import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock } from "lucide-react";
import { format } from "date-fns";
import { getPriorityBadge } from "../../utils/statusUtils";

interface AssessmentItemProps {
  assessment: {
    id: string;
    assessment_type: string;
    status: string;
    risk_level?: string;
    due_date?: string;
  };
}

export const AssessmentItem = ({ assessment }: AssessmentItemProps) => {
  const priorityVariant = getPriorityBadge(assessment.risk_level);
  
  return (
    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
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
        {priorityVariant && assessment.risk_level && (
          <Badge variant={priorityVariant}>{assessment.risk_level} Priority</Badge>
        )}
        <Badge variant="outline">{assessment.status}</Badge>
      </div>
    </div>
  );
};