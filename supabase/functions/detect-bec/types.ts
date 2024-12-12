export interface EmailAnalysisRequest {
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  content: string;
  ipAddress: string;
  timestamp: string;
  headers: Record<string, string>;
}

export interface DomainRiskResult {
  spoofing_detected: boolean;
  age_days: number;
  suspicious_records: string[];
  risk_level: 'low' | 'medium' | 'high';
}

export interface PatternAnalysisResult {
  suspicious_patterns: string[];
  confidence: number;
}

export interface BehavioralAnalysisResult {
  anomalies: string[];
  risk_level: number;
}