/**
 * @component AssessmentItem
 * @description Displays individual security assessment items within a security program card.
 * Shows assessment type, status, risk level, and due date information. Each assessment
 * can have different priority levels and statuses, which are visually represented through badges.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.assessment - The assessment object containing details about the security assessment
 * @param {string} props.assessment.id - Unique identifier for the assessment
 * @param {string} props.assessment.assessment_type - Type of security assessment (e.g., "vulnerability_scan", "compliance_audit")
 * @param {string} props.assessment.status - Current status of the assessment (e.g., "pending", "completed")
 * @param {string} [props.assessment.risk_level] - Optional risk level of the assessment (e.g., "high", "medium", "low")
 * @param {string} [props.assessment.due_date] - Optional due date for the assessment completion
 * 
 * @example
 * ```tsx
 * const assessment = {
 *   id: "123",
 *   assessment_type: "vulnerability_scan",
 *   status: "in_progress",
 *   risk_level: "high",
 *   due_date: "2024-03-15"
 * };
 * 
 * <AssessmentItem assessment={assessment} />
 * ```
 */
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