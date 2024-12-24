import { AssessmentItem } from "./AssessmentItem";

interface Assessment {
  id: string;
  assessment_type: string;
  status: string;
  risk_level?: string;
  due_date?: string;
}

interface RecentAssessmentsProps {
  assessments: Assessment[];
}

export const RecentAssessments = ({ assessments }: RecentAssessmentsProps) => {
  if (!assessments || assessments.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Recent Assessments</h4>
      <div className="space-y-2">
        {assessments.slice(0, 3).map((assessment) => (
          <AssessmentItem key={assessment.id} assessment={assessment} />
        ))}
      </div>
    </div>
  );
};