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

export type { SecurityAssessment } from './security/assessments';
export type { SecurityProgram } from './security/programs';
export type SecurityProgramInsert = TablesInsert<'product_security_programs'>;
export type SecurityProgramUpdate = TablesUpdate<'product_security_programs'>;
export type ComplianceReport = Tables<'compliance_reports'>;