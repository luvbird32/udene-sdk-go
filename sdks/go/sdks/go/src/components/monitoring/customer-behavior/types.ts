export interface Transaction {
  amount: number;
  timestamp: string;
  deviceId: string;
  location: string;
}

export interface CustomerPattern {
  customerId: string;
  velocity: number;
  deviceCount: number;
  locationCount: number;
  avgAmount: number;
  unusualActivity: boolean;
  recentTransactions: Transaction[];
}