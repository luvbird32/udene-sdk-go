import { Json } from "../database";

export interface SecurityAssessment {
  id: string;
  program_id?: string | null;
  assessment_type: string;
  status: string;
  findings: Json | null;
  risk_level?: string | null;
  remediation_plan?: Json | null;
  assigned_to?: string | null;
  due_date?: string | null;
  completed_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}