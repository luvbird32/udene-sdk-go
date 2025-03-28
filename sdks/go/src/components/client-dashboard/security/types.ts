export interface VulnerabilityDetail {
  id: string;
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cve_id?: string;
  affected_component: string;
  remediation_steps: string[];
  references: string[];
  discovered_at: string;
}

export interface VulnerabilityScan {
  id: string;
  scan_type: string;
  status: string;
  start_time: string;
  end_time: string | null;
  total_vulnerabilities: number;
  severity_breakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  findings: VulnerabilityDetail[];
  scan_duration?: string | null; // Updated to match the database type
}