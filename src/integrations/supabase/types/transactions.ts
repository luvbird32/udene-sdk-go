import { Database } from "./database";

export type Transaction = Database['public']['Tables']['transactions']['Row'];
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];

export type RewardsTransaction = Database['public']['Tables']['rewards_transactions']['Row'];
export type RewardsTransactionInsert = Database['public']['Tables']['rewards_transactions']['Insert'];
export type RewardsTransactionUpdate = Database['public']['Tables']['rewards_transactions']['Update'];