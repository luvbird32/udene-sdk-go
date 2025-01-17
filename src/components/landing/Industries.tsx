import { Building2, ShoppingCart, Plane, Building, Briefcase, Hospital, Gamepad2, Smartphone, Heart, Globe } from "lucide-react";

export const Industries = () => {
  const industries = [
    {
      icon: Smartphone,
      name: "SaaS & Digital Services",
      description: "Prevent trial abuse, stop subscription fraud, and protect your revenue with advanced user behavior analysis"
    },
    {
      icon: ShoppingCart,
      name: "E-commerce & Marketplaces",
      description: "Stop promotion abuse, prevent account sharing, and secure marketplace transactions with real-time protection"
    },
    {
      icon: Building2,
      name: "Financial Technology",
      description: "Protect against bonus abuse, prevent multi-accounting, and secure financial transactions with AI-powered monitoring"
    },
    {
      icon: Gamepad2,
      name: "Gaming & Entertainment",
      description: "Stop trial exploitation, prevent reward abuse, and secure in-game economies with behavioral pattern detection"
    },
    {
      icon: Heart,
      name: "Dating & Social",
      description: "Prevent free feature abuse, stop fake premium accounts, and protect user interactions with cross-platform tracking"
    },
    {
      icon: Globe,
      name: "EdTech & Learning",
      description: "Stop trial hopping, prevent course sharing, and protect educational content with advanced fraud detection"
    },
    {
      icon: Building,
      name: "Subscription Services",
      description: "Prevent subscription abuse, stop account sharing, and protect recurring revenue with behavioral analysis"
    },
    {
      icon: Hospital,
      name: "Digital Healthcare",
      description: "Protect telemedicine services, prevent trial exploitation, and secure patient interactions with compliant monitoring"
    },
    {
      icon: Plane,
      name: "Travel & Hospitality",
      description: "Stop loyalty program abuse, prevent booking fraud, and secure reservations with AI-powered verification"
    },
    {
      icon: Briefcase,
      name: "B2B Software",
      description: "Prevent enterprise trial abuse, stop license sharing, and protect API access with comprehensive monitoring"
    }
  ];

  return (
    <section className="relative z-10 py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            Industries Protected Against System Exploitation
          </h2>
          <p className="text-xl text-green-300/80 max-w-3xl mx-auto">
            Our intelligent system adapts to prevent exploitation across different business models
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-green-900/20"
            >
              <industry.icon className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-green-300 mb-2">
                {industry.name}
              </h3>
              <p className="text-green-300/80 text-sm leading-relaxed">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};