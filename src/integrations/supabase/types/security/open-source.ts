import { Json } from "../database";

export interface SeverityBreakdown {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface OpenSourceScan {
  id: string;
  project_id: string;
  scan_type: string;
  package_manager: string;
  dependencies_scanned: number | null;
  vulnerabilities_found: number | null;
  severity_breakdown: SeverityBreakdown;
  scan_results: Json | null;
  remediation_steps: string[];
  created_at: string | null;
  updated_at: string | null;
}