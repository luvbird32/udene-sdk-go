import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const PricingPlans = () => {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      description: "Perfect for small businesses getting started with fraud prevention",
      features: [
        "Up to 5,000 API calls/month",
        "Basic fraud detection rules",
        "Email support",
        "Real-time monitoring",
        "Standard API access",
        "Basic reporting"
      ],
      buttonText: "Start Free Trial",
      highlighted: false
    },
    {
      name: "Professional",
      price: "$149",
      period: "per month",
      description: "Advanced protection for growing businesses",
      features: [
        "Up to 25,000 API calls/month",
        "Advanced ML detection",
        "24/7 priority support",
        "Custom rule engine",
        "Webhook integrations",
        "Advanced analytics"
      ],
      buttonText: "Get Started",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      description: "Tailored solutions for large organizations",
      features: [
        "Unlimited API calls",
        "Custom ML models",
        "Dedicated support team",
        "Multi-region deployment",
        "SLA guarantee",
        "Custom reporting"
      ],
      buttonText: "Contact Sales",
      highlighted: false
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
            Choose the plan that best fits your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
                plan.highlighted ? "border-2 border-green-400" : "border border-green-500/20"
              }`}
            >
              <h3 className="text-2xl font-semibold text-green-300 mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-green-400">{plan.price}</span>
                <span className="text-green-300/80 ml-2">{plan.period}</span>
              </div>
              <p className="text-green-300/80 mb-6">
                {plan.description}
              </p>
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