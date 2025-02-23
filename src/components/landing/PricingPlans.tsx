
import { Check, Sparkles, TrendingUp, Clock, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LoadingState } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";

// Fallback data for development/loading scenarios
const fallbackPlans = [
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

interface PricingPlan {
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

export const PricingPlans = () => {
  const { toast } = useToast();

  const { data: plans, isLoading, error } = useQuery({
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

        // Transform the data to match our component's needs
        return plansData.map((plan: any) => ({
          ...plan,
          features: plan.pricing_features?.map((f: any) => f.feature) || [],
          pricing_tiers: plan.pricing_tiers?.map((t: any) => t.tier_description) || [],
          price: plan.price?.toString() ?? "Custom",
          base_price: plan.base_price?.toString(),
        }));
      } catch (error) {
        console.error('Error in pricing plans query:', error);
        // In development, fall back to static data
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

  if (isLoading) {
    return (
      <section className="py-16 relative z-10 bg-black/40">
        <LoadingState message="Loading pricing plans..." />
      </section>
    );
  }

  if (error) {
    console.error('Pricing plans error:', error);
    return (
      <section className="py-16 relative z-10 bg-black/40">
        <ErrorState error={error as Error} />
      </section>
    );
  }

  // Use fallback plans if no data is available
  const displayPlans = plans || fallbackPlans;

  return (
    <section className="py-16 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
            Choose Your Security Level
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Flexible pricing options that grow with your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPlans.map((plan) => (
            <div
              key={plan.id}
              className={`glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105 relative ${
                plan.is_highlighted ? "border-2 border-secondary shadow-lg shadow-secondary/20" : "border border-secondary/20"
              }`}
            >
              {plan.is_best_value && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="bg-secondary text-white px-6 py-1.5">
                    <Star className="w-4 h-4 mr-1 inline-block" />
                    Most Popular
                  </Badge>
                </div>
              )}
              {plan.is_promo && (
                <div className="mb-4">
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Special Offer
                  </Badge>
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-3">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">
                  {typeof plan.price === 'number' ? `$${plan.price.toFixed(3)}` : plan.price}
                </span>
                <span className="text-gray-300 ml-2 text-sm">{plan.period}</span>
                {plan.base_price && (
                  <div className="text-sm text-gray-400 mt-2">
                    <span className="line-through">${plan.base_price}</span>
                    <span className="ml-2">standard rate</span>
                  </div>
                )}
              </div>
              <p className="text-gray-300 text-sm mb-4 h-12">
                {plan.description}
              </p>
              {plan.is_promo && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-6 space-y-2">
                  <p className="text-sm text-secondary flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {plan.promotion}
                  </p>
                  {plan.savings && (
                    <p className="text-sm text-secondary flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {plan.savings}
                    </p>
                  )}
                  <p className="text-sm text-secondary flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {plan.volume_discount}
                  </p>
                </div>
              )}
              {plan.pricing_tiers && plan.pricing_tiers.length > 0 && (
                <div className="mb-6 bg-black/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-200 mb-3">Volume Pricing:</p>
                  <ul className="space-y-2">
                    {plan.pricing_tiers.map((tier, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-secondary" />
                        {tier}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <ul className="space-y-3 mb-8">
                {plan.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300 text-sm">
                    <Check className="w-5 h-5 text-secondary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/dashboard" className="block">
                <Button 
                  className={`w-full py-6 text-base font-semibold ${
                    plan.is_highlighted 
                      ? "bg-secondary hover:bg-secondary-dark text-white" 
                      : "border-secondary text-secondary hover:bg-secondary/20"
                  }`}
                  variant={plan.is_highlighted ? "default" : "outline"}
                >
                  {plan.name === 'Enterprise' ? 'Contact Enterprise Sales' : 
                    plan.name === 'Pay As You Go' ? 'Start Free Trial' : 'Upgrade to Growth'}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
