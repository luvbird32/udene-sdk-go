import { Json } from '../database';

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

export interface ComplianceReportsTable {
  Row: {
    id: string;
    report_type: string;
    report_period: unknown;
    generated_by: string | null;
    status: string;
    report_data: Json | null;
    download_url: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    report_type: string;
    report_period: unknown;
    generated_by?: string | null;
    status?: string;
    report_data?: Json | null;
    download_url?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    report_type?: string;
    report_period?: unknown;
    generated_by?: string | null;
    status?: string;
    report_data?: Json | null;
    download_url?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}