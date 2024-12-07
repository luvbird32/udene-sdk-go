import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

export const PricingPlans = () => {
  // Initialize and manage slot counts using local storage
  const getInitialSlots = (plan: string) => {
    const stored = localStorage.getItem(`${plan}_slots`);
    if (!stored) {
      // Set initial values
      const initial = plan === 'starter' ? 235 : 180;
      localStorage.setItem(`${plan}_slots`, initial.toString());
      return initial;
    }
    return parseInt(stored);
  };

  const decreaseSlots = () => {
    ['starter', 'professional'].forEach(plan => {
      const currentSlots = getInitialSlots(plan);
      if (currentSlots > 1) { // Keep at least 1 slot
        const newSlots = currentSlots - Math.floor(Math.random() * 3) - 1; // Decrease by 1-3 slots
        localStorage.setItem(`${plan}_slots`, Math.max(1, newSlots).toString());
      }
    });
  };

  // Effect to decrease slots on component mount
  useEffect(() => {
    decreaseSlots();
  }, []);

  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      description: "Perfect for small businesses getting started with fraud prevention",
      promotion: "First 1000 annual subscribers get lifetime fixed rate + 1M API calls/month",
      features: [
        "Up to 5,000 API calls/month",
        "Basic fraud detection rules",
        "Email support",
        "Real-time monitoring",
        "Standard API access",
        "Basic reporting"
      ],
      buttonText: "Start Annual Plan",
      highlighted: false,
      isPromo: true,
      slotsLeft: getInitialSlots('starter')
    },
    {
      name: "Professional",
      price: "$149",
      period: "per month",
      description: "Advanced protection for growing businesses",
      promotion: "First 1000 annual subscribers lock in 50% off + 3M API calls/month for life",
      features: [
        "Up to 25,000 API calls/month",
        "Advanced ML detection",
        "24/7 priority support",
        "Custom rule engine",
        "Webhook integrations",
        "Advanced analytics"
      ],
      buttonText: "Get Annual Plan",
      highlighted: true,
      isPromo: true,
      slotsLeft: getInitialSlots('professional')
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
              {plan.isPromo && (
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Early Bird Offer
                  </Badge>
                  {plan.slotsLeft && plan.slotsLeft > 0 && (
                    <div className="text-sm text-green-300 bg-green-500/10 p-2 rounded-md">
                      <span className="font-bold">{plan.slotsLeft}</span> slots remaining
                    </div>
                  )}
                </div>
              )}
              <h3 className="text-2xl font-semibold text-green-300 mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-green-400">{plan.price}</span>
                <span className="text-green-300/80 ml-2">{plan.period}</span>
                {plan.isPromo && (
                  <div className="text-sm text-green-300/80 mt-1">
                    Billed annually
                  </div>
                )}
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