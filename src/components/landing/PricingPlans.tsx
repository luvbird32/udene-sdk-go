
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const PricingPlans = () => {
  const plans = [
    {
      name: "Pay As You Go",
      price: "$0.001",
      period: "per API call",
      description: "Perfect for businesses of any size with flexible usage needs",
      promotion: "First 1000 API calls free for new users",
      features: [
        "No minimum commitment",
        "Real-time fraud detection",
        "Email support",
        "Basic reporting",
        "Standard API access",
        "Pay only for what you use"
      ],
      buttonText: "Start Free Trial",
      highlighted: true,
      isPromo: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      description: "Tailored solutions for large organizations with specific needs",
      features: [
        "Volume discounts",
        "Custom ML models",
        "24/7 dedicated support",
        "Multi-region deployment",
        "SLA guarantee",
        "Custom reporting"
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Only pay for what you use, with no hidden fees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                plan.highlighted ? "border-2 border-secondary" : "border border-secondary/20"
              }`}
            >
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
              </div>
              <p className="text-gray-300 text-sm mb-3">
                {plan.description}
              </p>
              {plan.isPromo && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-2 mb-4">
                  <p className="text-xs text-secondary">
                    <Sparkles className="w-3 h-3 inline-block mr-1" />
                    {plan.promotion}
                  </p>
                </div>
              )}
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
