
import { Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PricingFeatures } from "./PricingFeatures";
import { PricingTiers } from "./PricingTiers";
import { PricingPromo } from "./PricingPromo";
import { PricingPlan } from "./types";

interface PricingCardProps {
  plan: PricingPlan;
}

export const PricingCard = ({ plan }: PricingCardProps) => {
  return (
    <div
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
      {plan.is_promo && plan.promotion && (
        <PricingPromo
          promotion={plan.promotion}
          savings={plan.savings || undefined}
          volumeDiscount={plan.volume_discount}
        />
      )}
      {plan.pricing_tiers && <PricingTiers tiers={plan.pricing_tiers} />}
      {plan.features && <PricingFeatures features={plan.features} />}
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
  );
};
