export interface EmailChange {
  id: string;
  user_id: string;
  previous_email: string;
  new_email: string;
  changed_at: string;
  risk_score: number;
  requires_review: boolean;
  device_fingerprint: string;
  ip_address: string;
}