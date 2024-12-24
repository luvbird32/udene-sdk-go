import { format } from "date-fns";
import { Json } from "@/integrations/supabase/types";

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

interface ScanResult {
  status: string;
  end_time: string;
  total_vulnerabilities: number;
  severity_breakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  findings: VulnerabilityDetail[];
}

export const calculateScanProgress = (status: string, endTime: string | null) => {
  switch (status) {
    case 'in_progress':
      return !endTime ? 70 : 100;
    case 'completed':
      return 100;
    case 'failed':
      return 100;
    default:
      return 0;
  }
};

const generateVulnerabilityDetail = (severity: 'critical' | 'high' | 'medium' | 'low'): VulnerabilityDetail => {
  const vulnerabilityTemplates = {
    critical: {
      name: 'Remote Code Execution Vulnerability',
      description: 'A critical vulnerability that allows remote code execution through unvalidated user input.',
      remediation: ['Update affected packages to latest version', 'Implement input validation', 'Add WAF rules'],
      component: 'Authentication Service'
    },
    high: {
      name: 'SQL Injection Vulnerability',
      description: 'SQL injection vulnerability in database queries due to improper input sanitization.',
      remediation: ['Use parameterized queries', 'Implement input validation', 'Update ORM layer'],
      component: 'Data Access Layer'
    },
    medium: {
      name: 'Cross-Site Scripting (XSS)',
      description: 'Reflected XSS vulnerability in user input fields.',
      remediation: ['Implement content security policy', 'Sanitize user input', 'Use React escaping'],
      component: 'Frontend Components'
    },
    low: {
      name: 'Information Disclosure',
      description: 'Sensitive information exposure through detailed error messages.',
      remediation: ['Implement proper error handling', 'Configure production logging', 'Review error messages'],
      component: 'Error Handling'
    }
  };

  const template = vulnerabilityTemplates[severity];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: template.name,
    description: template.description,
    severity,
    cve_id: `CVE-${new Date().getFullYear()}-${Math.floor(Math.random() * 9999)}`,
    affected_component: template.component,
    remediation_steps: template.remediation,
    references: [
      'https://owasp.org/Top10',
      'https://cve.mitre.org',
      'https://nvd.nist.gov'
    ],
    discovered_at: new Date().toISOString()
  };
};

export const generateMockScanResults = (): ScanResult => {
  // Generate random counts for each severity level
  const critical = Math.floor(Math.random() * 2);
  const high = Math.floor(Math.random() * 3);
  const medium = Math.floor(Math.random() * 4);
  const low = Math.floor(Math.random() * 5);

  // Generate detailed findings
  const findings: VulnerabilityDetail[] = [
    ...Array(critical).fill(null).map(() => generateVulnerabilityDetail('critical')),
    ...Array(high).fill(null).map(() => generateVulnerabilityDetail('high')),
    ...Array(medium).fill(null).map(() => generateVulnerabilityDetail('medium')),
    ...Array(low).fill(null).map(() => generateVulnerabilityDetail('low'))
  ];

  return {
    status: 'completed',
    end_time: new Date().toISOString(),
    total_vulnerabilities: findings.length,
    severity_breakdown: {
      critical,
      high,
      medium,
      low
    },
    findings
  };
};