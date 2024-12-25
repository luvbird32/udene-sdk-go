import type { Tables, TablesInsert, TablesUpdate } from './database';

export interface SeverityBreakdown {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface OpenSourceScan extends Tables<'open_source_scans'> {
  severity_breakdown: SeverityBreakdown;
  remediation_steps: string[];
}

export interface SecurityAssessment {
  id: string;
  assessment_type: string;
  status: string;
  findings: any[];
  risk_level?: string;
  due_date?: string;
}

export interface SecurityProgram extends Tables<'product_security_programs'> {
  compliance_requirements: string[];
  security_assessments?: SecurityAssessment[];
}

export type SecurityProgramInsert = TablesInsert<'product_security_programs'>;
export type SecurityProgramUpdate = TablesUpdate<'product_security_programs'>;
export type ComplianceReport = Tables<'compliance_reports'>;