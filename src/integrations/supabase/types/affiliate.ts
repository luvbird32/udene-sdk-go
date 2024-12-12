import { Database } from "./database";

export type AffiliateActivity = Database['public']['Tables']['affiliate_activities']['Row'];
export type AffiliateActivityInsert = Database['public']['Tables']['affiliate_activities']['Insert'];
export type AffiliateActivityUpdate = Database['public']['Tables']['affiliate_activities']['Update'];