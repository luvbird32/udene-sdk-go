export interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: "admin" | "user" | "analyst" | "premium";
  lastActive: string;
  status: "active" | "inactive" | "blocked" | "suspended" | "investigating";
  lastStatusChange?: string;
}

export interface ThreatReport {
  id: string;
  reported_user_id: string;
  reporter_id: string;
  threat_type: string;
  description: string | null;
  evidence: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  created_at: string;
  updated_at: string;
}