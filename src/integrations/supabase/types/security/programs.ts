import { Json } from "../database";

export interface SecurityProgram {
  id: string;
  name: string;
  description: string | null;
  status: string;
  type: string;
  compliance_requirements: string[];
  security_controls: Json | null;
  audit_frequency: string | null;
  last_audit_date: string | null;
  next_audit_date: string | null;
  risk_assessment: Json | null;
  created_at: string | null;
  updated_at: string | null;
}