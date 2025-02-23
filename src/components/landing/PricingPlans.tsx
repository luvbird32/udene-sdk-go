
import { Check, Sparkles, TrendingUp, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const PricingPlans = () => {
  const plans = [
    {
      name: "Pay As You Go",
      price: "$0.002",
      period: "per API call",
      description: "Perfect for getting started with full access to all features",
      promotion: "First 10,000 API calls free",
      volumeDiscount: "No minimum commitment required",
      features: [
        "Full access to all fraud detection features",
        "Complete ML model suite",
        "Real-time API access",
        "Advanced reporting dashboard",
        "Email & community support",
        "Standard SLA",
        "Single region deployment"
      ],
      pricingTiers: [
        "First 10K calls: Free",
        "10K-100K calls: $0.002/call",
        "100K+ calls: Volume discount available"
      ],
      buttonText: "Start Now",
      highlighted: false,
      isPromo: true
    },
    {
      name: "Growth",
      basePrice: "$0.002",
      price: "$0.001",
      period: "per API call",
      description: "Ideal for businesses with predictable volume",
      promotion: "50% savings with minimum commitment",
      savings: "Save up to $10,000/year",
      volumeDiscount: "$1,000 monthly minimum",
      features: [
        "Full access to all fraud detection features",
        "Complete ML model suite",
        "Real-time API access",
        "Advanced reporting dashboard",
        "Priority support",
        "Enhanced SLA",
        "Multi-region deployment"
      ],
      pricingTiers: [
        "Minimum $1,000/month commitment",
        "All calls at $0.001 each",
        "Unused credits roll over 90 days"
      ],
      buttonText: "Get Started",
      highlighted: true,
      isPromo: true,
      bestValue: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "volume-based pricing",
      description: "Custom pricing for high-volume users",
      volumeDiscount: "Custom volume commitment",
      features: [
        "Full access to all fraud detection features",
        "Complete ML model suite",
        "Real-time API access",
        "Advanced reporting dashboard",
        "24/7 dedicated support",
        "Custom SLA guarantees",
        "Global deployment options",
        "Custom contract terms"
      ],
      pricingTiers: [
        "Volume-based custom pricing",
        "Annual commitment options",
        "Custom payment terms available"
      ],
      buttonText: "Contact Sales",
      highlighted: false,
      isPromo: false
    }
  ];

  return (
    <section className="py-16 relative z-10 bg-black/40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
            Flexible Pricing for Every Scale
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start free and scale as you grow, with predictable pricing and volume discounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 relative ${
                plan.highlighted ? "border-2 border-secondary" : "border border-secondary/20"
              }`}
            >
              {plan.bestValue && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="bg-secondary text-white px-4 py-1">
                    Best Value
                  </Badge>
                </div>
              )}
              {plan.isPromo && (
                <div className="mb-3">
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Special Offer
                  </Badge>
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-2">
                {plan.name}
              </h3>
              <div className="mb-3">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-300 ml-2 text-sm">{plan.period}</span>
                {plan.basePrice && (
                  <div className="text-sm text-gray-400 mt-1">
                    <span className="line-through">{plan.basePrice}</span>
                    <span className="ml-2">per API call</span>
                  </div>
                )}
              </div>
              <p className="text-gray-300 text-sm mb-3">
                {plan.description}
              </p>
              {plan.isPromo && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 mb-4 space-y-2">
                  <p className="text-xs text-secondary flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {plan.promotion}
                  </p>
                  {plan.savings && (
                    <p className="text-xs text-secondary flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {plan.savings}
                    </p>
                  )}
                  <p className="text-xs text-secondary flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {plan.volumeDiscount}
                  </p>
                </div>
              )}
              <div className="mb-4 bg-black/20 rounded-lg p-3">
                <p className="text-sm font-semibold text-gray-200 mb-2">Volume Pricing:</p>
                <ul className="space-y-1">
                  {plan.pricingTiers?.map((tier, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-center">
                      <Shield className="w-3 h-3 mr-1 text-secondary" />
                      {tier}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-secondary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/dashboard">
                <Button 
                  className={`w-full py-4 text-base ${
                    plan.highlighted 
                      ? "bg-secondary hover:bg-secondary-dark text-white" 
                      : "border-secondary text-secondary hover:bg-secondary/20"
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
