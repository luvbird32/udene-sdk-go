import { Json } from '../database';

export interface IdentityVerificationsTable {
  Row: {
    id: string;
    user_id: string | null;
    verification_type: string;
    status: string;
    document_type: string | null;
    document_number: string | null;
    document_country: string | null;
    document_expiry: string | null;
    document_files: Json | null;
    selfie_file: string | null;
    verification_data: Json | null;
    verification_score: number | null;
    risk_flags: Json | null;
    rejection_reason: string | null;
    verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    user_id?: string | null;
    verification_type: string;
    status?: string;
    document_type?: string | null;
    document_number?: string | null;
    document_country?: string | null;
    document_expiry?: string | null;
    document_files?: Json | null;
    selfie_file?: string | null;
    verification_data?: Json | null;
    verification_score?: number | null;
    risk_flags?: Json | null;
    rejection_reason?: string | null;
    verified_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    user_id?: string | null;
    verification_type?: string;
    status?: string;
    document_type?: string | null;
    document_number?: string | null;
    document_country?: string | null;
    document_expiry?: string | null;
    document_files?: Json | null;
    selfie_file?: string | null;
    verification_data?: Json | null;
    verification_score?: number | null;
    risk_flags?: Json | null;
    rejection_reason?: string | null;
    verified_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}

export interface VerificationAttemptsTable {
  Row: {
    id: string;
    verification_id: string | null;
    attempt_type: string;
    attempt_data: Json | null;
    success: boolean | null;
    failure_reason: string | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string | null;
  };
  Insert: {
    id?: string;
    verification_id?: string | null;
    attempt_type: string;
    attempt_data?: Json | null;
    success?: boolean | null;
    failure_reason?: string | null;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: string | null;
  };
  Update: {
    id?: string;
    verification_id?: string | null;
    attempt_type?: string;
    attempt_data?: Json | null;
    success?: boolean | null;
    failure_reason?: string | null;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: string | null;
  };
}