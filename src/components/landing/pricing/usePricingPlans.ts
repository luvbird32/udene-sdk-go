import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PricingPlan } from "./types";

// Fallback data for development/loading scenarios
export const fallbackPlans = [
  {
    id: "pay-as-you-go",
    name: "Pay As You Go",
    price: 0.002,
    period: "per API call",
    description: "Start with zero commitment and scale as you grow",
    promotion: "First 10,000 API calls free",
    volume_discount: "Pay only for what you use",
    is_highlighted: false,
    is_promo: true,
    is_best_value: false,
    features: [
      "Real-time fraud detection",
      "Basic analytics dashboard",
      "Email support",
      "Standard API access",
      "Community forum access"
    ]
  },
  {
    id: "growth",
    name: "Growth",
    price: 0.001,
    base_price: 0.002,
    period: "per API call",
    description: "Perfect for scaling businesses with consistent volume",
    promotion: "50% off standard rate",
    savings: "Save up to 50% on API calls",
    volume_discount: "$1,000 monthly minimum",
    is_highlighted: true,
    is_promo: true,
    is_best_value: true,
    features: [
      "All Pay As You Go features",
      "Advanced fraud detection",
      "Priority email & chat support",
      "Advanced analytics",
      "Custom rules engine",
      "Dedicated account manager"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    period: "annual contract",
    description: "Tailored solutions for large-scale operations",
    volume_discount: "Volume-based custom pricing",
    is_highlighted: false,
    is_promo: false,
    is_best_value: false,
    features: [
      "All Growth features",
      "Custom ML model training",
      "24/7 phone support",
      "Custom integration support",
      "On-premise deployment option",
      "SLA guarantees",
      "Dedicated security team"
    ]
  }
];

export const usePricingPlans = () => {
  return useQuery({
    queryKey: ['pricing-plans'],
    queryFn: async () => {
      try {
        console.log('Fetching pricing plans...');
        const { data: plansData, error: plansError } = await supabase
          .from('pricing_plans')
          .select(`
            *,
            pricing_features (feature),
            pricing_tiers (tier_description)
          `);

        if (plansError) {
          console.error('Error fetching pricing plans:', plansError);
          throw plansError;
        }

        if (!plansData || plansData.length === 0) {
          console.log('No pricing plans found in database, using fallback data');
          return fallbackPlans;
        }

        return plansData.map((plan: any) => ({
          ...plan,
          features: plan.pricing_features?.map((f: any) => f.feature) || [],
          pricing_tiers: plan.pricing_tiers?.map((t: any) => t.tier_description) || [],
          price: plan.price?.toString() ?? "Custom",
          base_price: plan.base_price?.toString(),
        }));
      } catch (error) {
        console.error('Error in pricing plans query:', error);
        if (import.meta.env.DEV) {
          console.log('Using fallback pricing plans in development');
          return fallbackPlans;
        }
        throw error;
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
