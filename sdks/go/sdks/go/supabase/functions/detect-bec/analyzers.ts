import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { calculateLevenshteinDistance } from './utils.ts';
import type { EmailAnalysisRequest, PatternAnalysisResult, BehavioralAnalysisResult, DomainRiskResult } from './types.ts';

export async function analyzeEmailPatterns(
  supabase: ReturnType<typeof createClient>,
  emailData: EmailAnalysisRequest
): Promise<PatternAnalysisResult> {
  const patterns = {
    suspicious_patterns: [],
    confidence: 0
  };

  // Check for similar domain typos
  const originalDomain = emailData.recipientEmail.split('@')[1];
  const senderDomain = emailData.senderEmail.split('@')[1];
  
  if (calculateLevenshteinDistance(originalDomain, senderDomain) <= 2) {
    patterns.suspicious_patterns.push('similar_domain');
    patterns.confidence += 0.4;
  }

  // Check for executive names in sender
  const { data: executives } = await supabase
    .from('profiles')
    .select('username')
    .eq('role', 'executive');

  if (executives?.some(exec => 
    emailData.senderEmail.toLowerCase().includes(exec.username.toLowerCase())
  )) {
    patterns.suspicious_patterns.push('executive_name_used');
    patterns.confidence += 0.3;
  }

  return patterns;
}

export function analyzeBehavioralPatterns(
  emailData: EmailAnalysisRequest
): BehavioralAnalysisResult {
  const anomalies = [];
  let riskLevel = 0;

  // Check for urgent language
  const urgentWords = ['urgent', 'immediate', 'required', 'asap'];
  if (urgentWords.some(word => 
    emailData.subject.toLowerCase().includes(word) || 
    emailData.content.toLowerCase().includes(word)
  )) {
    anomalies.push('urgent_language');
    riskLevel += 0.3;
  }

  // Check for payment-related content
  const paymentWords = ['payment', 'invoice', 'transfer', 'bank', 'wire'];
  if (paymentWords.some(word => 
    emailData.content.toLowerCase().includes(word)
  )) {
    anomalies.push('payment_related');
    riskLevel += 0.25;
  }

  return {
    anomalies,
    risk_level: riskLevel
  };
}

export async function checkDomainReputation(email: string): Promise<DomainRiskResult> {
  const domain = email.split('@')[1];
  
  // This is a placeholder for domain reputation check
  // In a production environment, this would integrate with domain reputation services
  return {
    spoofing_detected: false,
    age_days: 0,
    suspicious_records: [],
    risk_level: 'low'
  };
}

export function calculateRiskScore(
  patterns: PatternAnalysisResult,
  domainRisk: DomainRiskResult,
  behavioralRisk: BehavioralAnalysisResult
): number {
  let score = 0;
  
  // Pattern-based scoring
  score += patterns.confidence * 40;

  // Domain reputation scoring
  if (domainRisk.spoofing_detected) score += 30;
  if (domainRisk.risk_level === 'high') score += 20;

  // Behavioral scoring
  score += behavioralRisk.risk_level * 30;

  return Math.min(Math.round(score), 100);
}