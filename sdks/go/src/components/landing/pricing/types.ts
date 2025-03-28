
export interface PricingPlan {
  id: string;
  name: string;
  price: number | null;
  base_price: number | null;
  period: string;
  description: string;
  promotion: string | null;
  savings: string | null;
  volume_discount: string;
  is_highlighted: boolean;
  is_promo: boolean;
  is_best_value: boolean;
  features?: string[];
  pricing_tiers?: string[];
}

export interface PricingFeature {
  feature: string;
}

export interface PricingTier {
  tier_description: string;
}
