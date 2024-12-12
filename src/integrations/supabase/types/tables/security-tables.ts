import { Json } from '../database';

export interface SecurityProgramsTable {
  Row: {
    id: string;
    name: string;
    description: string | null;
    status: string;
    type: string;
    compliance_requirements: Json | null;
    security_controls: Json | null;
    audit_frequency: string | null;
    last_audit_date: string | null;
    next_audit_date: string | null;
    risk_assessment: Json | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    name: string;
    description?: string | null;
    status?: string;
    type: string;
    compliance_requirements?: Json | null;
    security_controls?: Json | null;
    audit_frequency?: string | null;
    last_audit_date?: string | null;
    next_audit_date?: string | null;
    risk_assessment?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    name?: string;
    description?: string | null;
    status?: string;
    type?: string;
    compliance_requirements?: Json | null;
    security_controls?: Json | null;
    audit_frequency?: string | null;
    last_audit_date?: string | null;
    next_audit_date?: string | null;
    risk_assessment?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}

export interface SecurityAssessmentsTable {
  Row: {
    id: string;
    program_id: string | null;
    assessment_type: string;
    status: string;
    findings: Json | null;
    risk_level: string | null;
    remediation_plan: Json | null;
    assigned_to: string | null;
    due_date: string | null;
    completed_date: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    program_id?: string | null;
    assessment_type: string;
    status?: string;
    findings?: Json | null;
    risk_level?: string | null;
    remediation_plan?: Json | null;
    assigned_to?: string | null;
    due_date?: string | null;
    completed_date?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    program_id?: string | null;
    assessment_type?: string;
    status?: string;
    findings?: Json | null;
    risk_level?: string | null;
    remediation_plan?: Json | null;
    assigned_to?: string | null;
    due_date?: string | null;
    completed_date?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}