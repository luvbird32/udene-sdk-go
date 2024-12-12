export interface IdentityVerification {
  id: string;
  user_id: string;
  verification_type: 'document' | 'biometric' | 'address';
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  document_type?: string;
  document_number?: string;
  document_country?: string;
  document_expiry?: string;
  document_files?: Record<string, any>;
  selfie_file?: string;
  verification_data?: Record<string, any>;
  verification_score?: number;
  risk_flags?: string[];
  rejection_reason?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface VerificationAttempt {
  id: string;
  verification_id: string;
  attempt_type: string;
  attempt_data?: Record<string, any>;
  success?: boolean;
  failure_reason?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}