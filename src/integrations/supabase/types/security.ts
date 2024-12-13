import type { Tables, TablesInsert, TablesUpdate } from './database';

export type SecurityProgram = Tables<'product_security_programs'>;
export type SecurityProgramInsert = TablesInsert<'product_security_programs'>;
export type SecurityProgramUpdate = TablesUpdate<'product_security_programs'>;

export type SecurityAssessment = Tables<'security_assessments'>;
export type SecurityAssessmentInsert = TablesInsert<'security_assessments'>;
export type SecurityAssessmentUpdate = TablesUpdate<'security_assessments'>;

export type OpenSourceScan = Tables<'open_source_scans'>;
export type OpenSourceScanInsert = TablesInsert<'open_source_scans'>;
export type OpenSourceScanUpdate = TablesUpdate<'open_source_scans'>;

export type ComplianceReport = Tables<'compliance_reports'>;
export type ComplianceReportInsert = TablesInsert<'compliance_reports'>;
export type ComplianceReportUpdate = TablesUpdate<'compliance_reports'>;