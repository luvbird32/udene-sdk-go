import { Database } from './database';

export type SecurityProgram = Database['public']['Tables']['product_security_programs']['Row'];
export type SecurityProgramInsert = Database['public']['Tables']['product_security_programs']['Insert'];
export type SecurityProgramUpdate = Database['public']['Tables']['product_security_programs']['Update'];

export type SecurityAssessment = Database['public']['Tables']['security_assessments']['Row'];
export type SecurityAssessmentInsert = Database['public']['Tables']['security_assessments']['Insert'];
export type SecurityAssessmentUpdate = Database['public']['Tables']['security_assessments']['Update'];

export type ComplianceReport = Database['public']['Tables']['compliance_reports']['Row'];
export type ComplianceReportInsert = Database['public']['Tables']['compliance_reports']['Insert'];
export type ComplianceReportUpdate = Database['public']['Tables']['compliance_reports']['Update'];