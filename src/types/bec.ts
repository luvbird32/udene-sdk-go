export interface EmailAnalysisRequest {
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  content: string;
  ipAddress: string;
  timestamp: string;
  headers: Record<string, string>;
}

export interface BECAnalysisResponse {
  risk_score: number;
  risk_factors: {
    domain_spoofing: boolean;
    suspicious_patterns: string[];
    behavioral_anomalies: string[];
  };
  recommendations: string[];
}