import { Database } from "./database";

export type Transaction = Database['public']['Tables']['transactions']['Row'];
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];

export type RewardsTransaction = Database['public']['Tables']['rewards_transactions']['Row'];
export type RewardsTransactionInsert = Database['public']['Tables']['rewards_transactions']['Insert'];
export type RewardsTransactionUpdate = Database['public']['Tables']['rewards_transactions']['Update'];

export type AffiliateActivity = Database['public']['Tables']['affiliate_activities']['Row'];
export type AffiliateActivityInsert = Database['public']['Tables']['affiliate_activities']['Insert'];
export type AffiliateActivityUpdate = Database['public']['Tables']['affiliate_activities']['Update'];