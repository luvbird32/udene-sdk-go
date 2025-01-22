export interface BusinessMetrics {
  roi: number;
  savings: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  customerImpactRate: number;
  totalTransactions: number;
  affectedCustomers: number;
  blockedTransactions?: number;
  totalAmountBlocked?: number;
  accuracy?: number;
  precision?: number;
  recall?: number;
  truePositives?: number;
  falsePositives?: number;
  trueNegatives?: number;
  falseNegatives?: number;
}

export interface TransactionMetrics {
  amount: number;
  risk_score: number;
  is_fraudulent: boolean | null;
}