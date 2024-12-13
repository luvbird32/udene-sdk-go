import { Json } from '../database';

export interface OpenSourceScanTable {
  Row: {
    id: string;
    project_id: string;
    scan_type: string;
    package_manager: string;
    dependencies_scanned: number | null;
    vulnerabilities_found: number | null;
    severity_breakdown: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    } | null;
    scan_results: Json | null;
    remediation_steps: Json | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    project_id: string;
    scan_type: string;
    package_manager: string;
    dependencies_scanned?: number | null;
    vulnerabilities_found?: number | null;
    severity_breakdown?: Json | null;
    scan_results?: Json | null;
    remediation_steps?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    project_id?: string;
    scan_type?: string;
    package_manager?: string;
    dependencies_scanned?: number | null;
    vulnerabilities_found?: number | null;
    severity_breakdown?: Json | null;
    scan_results?: Json | null;
    remediation_steps?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}