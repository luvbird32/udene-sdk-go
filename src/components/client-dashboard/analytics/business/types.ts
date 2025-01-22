export interface BusinessMetrics {
  roi: number;
  savings: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  customerImpactRate: number;
  totalTransactions: number;
  affectedCustomers: number;
}

export interface TransactionMetrics {
  amount: number;
  risk_score: number;
  is_fraudulent: boolean | null;
}