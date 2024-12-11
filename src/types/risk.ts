export * from './transactions';

export interface RiskIndicator {
  iconType: 'message' | 'user' | 'device' | 'mail' | 'info';
  title: string;
  description: string;
}