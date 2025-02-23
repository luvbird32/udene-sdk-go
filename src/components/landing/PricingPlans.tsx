
import { Check, Sparkles, TrendingUp, Clock, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
      // Fetch pricing plans
      const { data: plansData, error: plansError } = await supabase
        .from('pricing_plans')
        .select(`
          *,
          pricing_features (feature),
          pricing_tiers (tier_description)
        `);

      if (plansError) {
        console.error('Error fetching pricing plans:', plansError);
        toast({
          title: "Error loading pricing plans",
          description: "Please try again later",
          variant: "destructive",
        });
        throw plansError;
      }

      // Transform the data to match our component's needs
      return plansData.map((plan: any) => ({
        ...plan,
        features: plan.pricing_features?.map((f: any) => f.feature) || [],
        pricing_tiers: plan.pricing_tiers?.map((t: any) => t.tier_description) || [],
        price: plan.price?.toString() ?? "Custom",
        base_price: plan.base_price?.toString(),
      }));
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white animate-pulse">Loading pricing plans...</h2>
          </div>
        </div>
      </section>
    );
  }

  if (error || !plans) {
    return (
      <section className="py-16 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Unable to load pricing plans</h2>
            <p className="text-gray-300 mt-4">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

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
          {plans.map((plan, index) => (
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
