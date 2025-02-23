
import { Check, Sparkles, TrendingUp, Clock, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const PricingPlans = () => {
  const plans = [
    {
      name: "Pay As You Go",
      price: "$0.002",
      period: "per API call",
      description: "Start with zero commitment and scale as you grow",
      promotion: "First 10,000 API calls free",
      volumeDiscount: "Pay only for what you use",
      features: [
        "Access to core fraud detection features",
        "Basic ML model implementation",
        "Real-time API access",
        "Standard reporting dashboard",
        "Community forum support",
        "Basic SLA (24h response)",
        "Single region deployment",
        "Monthly billing cycles"
      ],
      pricingTiers: [
        "First 10K calls: Free",
        "10K-100K calls: $0.002/call",
        "100K+ calls: Contact sales"
      ],
      buttonText: "Start Free Trial",
      highlighted: false,
      isPromo: true
    },
    {
      name: "Growth",
      basePrice: "$0.002",
      price: "$0.001",
      period: "per API call",
      description: "Perfect for scaling businesses with consistent volume",
      promotion: "50% off standard rate",
      savings: "Up to $10,000 yearly savings",
      volumeDiscount: "$1,000 monthly minimum",
      features: [
        "Advanced fraud detection suite",
        "Premium ML model access",
        "Real-time API with higher rate limits",
        "Advanced analytics dashboard",
        "Priority email & chat support",
        "Enhanced SLA (12h response)",
        "Multi-region deployment",
        "Quarterly business reviews",
        "Dedicated success manager"
      ],
      pricingTiers: [
        "$1,000 minimum monthly spend",
        "All calls at $0.001 each",
        "90-day credit rollover"
      ],
      buttonText: "Upgrade to Growth",
      highlighted: true,
      isPromo: true,
      bestValue: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "annual contract",
      description: "Tailored solutions for large-scale operations",
      volumeDiscount: "Volume-based custom pricing",
      features: [
        "Custom fraud detection rules",
        "Dedicated ML model training",
        "Unlimited API access",
        "Custom reporting solutions",
        "24/7 dedicated support team",
        "Custom SLA guarantees",
        "Global deployment options",
        "Quarterly security audits",
        "Custom integration support",
        "Dedicated account team",
        "On-premise deployment option",
        "Annual strategic planning"
      ],
      pricingTiers: [
        "Custom volume pricing",
        "Flexible payment terms",
        "Annual contract options",
        "Enterprise SLA available"
      ],
      buttonText: "Contact Enterprise Sales",
      highlighted: false,
      isPromo: false
    }
  ];

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
              key={index}
              className={`glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105 relative ${
                plan.highlighted ? "border-2 border-secondary shadow-lg shadow-secondary/20" : "border border-secondary/20"
              }`}
            >
              {plan.bestValue && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="bg-secondary text-white px-6 py-1.5">
                    <Star className="w-4 h-4 mr-1 inline-block" />
                    Most Popular
                  </Badge>
                </div>
              )}
              {plan.isPromo && (
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
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-300 ml-2 text-sm">{plan.period}</span>
                {plan.basePrice && (
                  <div className="text-sm text-gray-400 mt-2">
                    <span className="line-through">{plan.basePrice}</span>
                    <span className="ml-2">standard rate</span>
                  </div>
                )}
              </div>
              <p className="text-gray-300 text-sm mb-4 h-12">
                {plan.description}
              </p>
              {plan.isPromo && (
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
                    {plan.volumeDiscount}
                  </p>
                </div>
              )}
              <div className="mb-6 bg-black/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-200 mb-3">Volume Pricing:</p>
                <ul className="space-y-2">
                  {plan.pricingTiers?.map((tier, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-secondary" />
                      {tier}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300 text-sm">
                    <Check className="w-5 h-5 text-secondary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/dashboard" className="block">
                <Button 
                  className={`w-full py-6 text-base font-semibold ${
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
