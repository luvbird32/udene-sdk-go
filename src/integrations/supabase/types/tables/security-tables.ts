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

export interface ComplianceReportsTable {
  Row: {
    id: string;
    report_type: string;
    report_period: string;
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
    report_period: string;
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
    report_period?: string;
    generated_by?: string | null;
    status?: string;
    report_data?: Json | null;
    download_url?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}