export interface TriggerEventType {
  id: string;
  label: string;
  description: string;
  category: 'fraud' | 'rewards' | 'compliance' | 'system';
}

export const EVENT_TYPES: TriggerEventType[] = [
  // Fraud Detection Events
  {
    id: 'fraud_detected',
    label: 'Fraud Detected',
    description: 'Triggered when high-confidence fraud is detected in your transactions',
    category: 'fraud'
  },
  {
    id: 'suspicious_activity',
    label: 'Suspicious Activity',
    description: 'Triggered when potentially suspicious behavior is identified',
    category: 'fraud'
  },
  {
    id: 'transaction_blocked',
    label: 'Transaction Blocked',
    description: 'Triggered when a transaction is prevented due to high risk',
    category: 'fraud'
  },
  {
    id: 'risk_score_change',
    label: 'Risk Score Change',
    description: 'Triggered when a significant change in risk score occurs',
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
    description: 'Triggered when points are redeemed unusually quickly',
    category: 'rewards'
  },
  // Compliance Events
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
  },
  // System Events
  {
    id: 'model_performance_drop',
    label: 'Model Performance Drop',
    description: 'Triggered when fraud detection accuracy decreases significantly',
    category: 'system'
  }
];