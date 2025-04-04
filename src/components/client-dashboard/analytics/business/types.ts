export interface BusinessMetrics {
  roi: number;
  savings: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  customerImpactRate: number;
  totalTransactions: number;
  affectedCustomers: number;
  averageTransactionValue: number;
  monthlyGrowthRate: number;
  retentionRate: number;
  fraudPreventionRate: number;
  averageResponseTime: number;
  riskScoreDistribution: number;
  highRiskPercentage: number;
  blockedTransactionRate: number;
}

export interface TransactionMetrics {
  amount: number;
  risk_score: number;
}