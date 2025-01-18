import type { Tables } from '@/integrations/supabase/types';

export type IdentityVerification = Tables<'identity_verifications'>;
export type VerificationAttempt = Tables<'verification_attempts'>;
export type BiometricVerification = Tables<'biometric_verifications'>;

export interface IdentityVerificationInsert extends Omit<Tables<'identity_verifications'>, 'id' | 'created_at' | 'updated_at'> {}
export interface VerificationAttemptInsert extends Omit<Tables<'verification_attempts'>, 'id' | 'created_at'> {}