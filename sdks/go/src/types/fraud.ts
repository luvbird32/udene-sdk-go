export interface Pattern {
  type: string;
  count: number;
  description: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface InteractionPatterns {
  multiple_devices?: boolean;
  vpn_detected?: boolean;
  device_count?: number;
  odd_hours_activity?: boolean;
}

export interface RiskFactors {
  location_mismatch?: boolean;
  suspicious_ip?: boolean;
  [key: string]: boolean | undefined;
}

export interface TransactionWithPatterns {
  interaction_patterns: InteractionPatterns | null;
  risk_factors: RiskFactors | null;
  profile_changes: Record<string, unknown> | null;
  card_present: boolean;
  recurring: boolean;
  risk_score: number | null;
  message_velocity: number | null;
  timestamp: string;
}