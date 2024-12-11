import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

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
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-green-300/80 max-w-3xl mx-auto">
            Only pay for what you use, with no hidden fees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
                plan.highlighted ? "border-2 border-green-400" : "border border-green-500/20"
              }`}
            >
              {plan.isPromo && (
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Special Offer
                  </Badge>
                </div>
              )}
              <h3 className="text-2xl font-semibold text-green-300 mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-green-400">{plan.price}</span>
                <span className="text-green-300/80 ml-2">{plan.period}</span>
              </div>
              <p className="text-green-300/80 mb-4">
                {plan.description}
              </p>
              {plan.isPromo && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-6">
                  <p className="text-sm text-green-300">
                    <Sparkles className="w-4 h-4 inline-block mr-1" />
                    {plan.promotion}
                  </p>
                </div>
              )}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-green-300">
                    <Check className="w-5 h-5 text-green-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/dashboard">
                <Button 
                  className={`w-full py-6 text-lg ${
                    plan.highlighted 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "border-green-500 text-green-400 hover:bg-green-900/20"
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