export interface TriggerEventType {
  id: string;
  label: string;
  description: string;
  category: 'fraud' | 'rewards' | 'compliance' | 'system' | 'reputation';
}

export const EVENT_TYPES: TriggerEventType[] = [
  // Fraud Detection Events
  {
    id: 'fraud_detected',
    label: 'Fraud Detected',
    description: 'Triggered when high-confidence fraud is detected',
    category: 'fraud'
  },
  {
    id: 'suspicious_activity',
    label: 'Suspicious Activity',
    description: 'Triggered when potentially suspicious behavior is identified',
    category: 'fraud'
  },
  {
    id: 'risk_score_change',
    label: 'Risk Score Change',
    description: 'Triggered when a significant change in risk score occurs',
    category: 'fraud'
  },
  {
    id: 'transaction_blocked',
    label: 'Transaction Blocked',
    description: 'Triggered when a transaction is prevented due to risk',
    category: 'fraud'
  },
  {
    id: 'user_blacklisted',
    label: 'User Blacklisted',
    description: 'Triggered when a user is added to the blacklist',
    category: 'fraud'
  },
  {
    id: 'device_flagged',
    label: 'Device Flagged',
    description: 'Triggered when a device is marked as suspicious',
    category: 'fraud'
  },
  {
    id: 'ip_blocked',
    label: 'IP Blocked',
    description: 'Triggered when an IP address is blocked',
    category: 'fraud'
  },
  {
    id: 'location_alert',
    label: 'Location Alert',
    description: 'Triggered when unusual location activity is detected',
    category: 'fraud'
  },
  {
    id: 'velocity_check_failed',
    label: 'Velocity Check Failed',
    description: 'Triggered when transaction velocity limits are exceeded',
    category: 'fraud'
  },
  {
    id: 'pattern_detected',
    label: 'Pattern Detected',
    description: 'Triggered when a suspicious pattern is identified',
    category: 'fraud'
  },
  // Rewards Events
  {
    id: 'reward_fraud_detected',
    label: 'Reward Fraud Detected',
    description: 'Triggered when suspicious reward program activity is detected',
    category: 'rewards'
  },
  {
    id: 'rapid_points_redemption',
    label: 'Rapid Points Redemption',
    description: 'Triggered when points are redeemed unusually quickly after earning',
    category: 'rewards'
  },
  {
    id: 'multiple_reward_accounts',
    label: 'Multiple Reward Accounts',
    description: 'Triggered when multiple reward accounts are linked to same user/device',
    category: 'rewards'
  },
  // Email Reputation Events
  {
    id: 'email_reputation_change',
    label: 'Email Reputation Change',
    description: 'Triggered when an email address reputation score changes significantly',
    category: 'reputation'
  },
  {
    id: 'new_email_fraud_flag',
    label: 'New Email Fraud Flag',
    description: 'Triggered when a new fraud flag is added to an email address',
    category: 'reputation'
  },
  // ML Model Events
  {
    id: 'model_performance_drop',
    label: 'Model Performance Drop',
    description: 'Triggered when ML model performance metrics decrease significantly',
    category: 'system'
  },
  {
    id: 'model_retrained',
    label: 'Model Retrained',
    description: 'Triggered when a fraud detection model is retrained',
    category: 'system'
  },
  // Compliance Events
  {
    id: 'compliance_report_generated',
    label: 'Compliance Report Generated',
    description: 'Triggered when a new compliance report is generated',
    category: 'compliance'
  },
  {
    id: 'data_retention_alert',
    label: 'Data Retention Alert',
    description: 'Triggered when data approaches retention policy limits',
    category: 'compliance'
  },
  {
    id: 'privacy_request_received',
    label: 'Privacy Request Received',
    description: 'Triggered when a GDPR/CCPA data request is received',
    category: 'compliance'
  }
];