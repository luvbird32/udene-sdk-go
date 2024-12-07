import { Building2, ShoppingCart, Plane, Building, Briefcase, Hospital, Gamepad2, Smartphone } from "lucide-react";

export const Industries = () => {
  const industries = [
    {
      icon: Building2,
      name: "Financial Services",
      description: "Protect banking transactions, detect credit card fraud, and secure digital payments"
    },
    {
      icon: ShoppingCart,
      name: "E-commerce",
      description: "Prevent account takeover, fight chargeback fraud, and secure marketplace transactions"
    },
    {
      icon: Plane,
      name: "Travel & Hospitality",
      description: "Combat booking fraud, prevent loyalty program abuse, and secure reservations"
    },
    {
      icon: Smartphone,
      name: "Digital Services",
      description: "Protect user accounts, prevent subscription fraud, and secure digital content"
    },
    {
      icon: Gamepad2,
      name: "Gaming & Entertainment",
      description: "Fight virtual currency fraud, prevent cheating, and secure in-game transactions"
    },
    {
      icon: Hospital,
      name: "Healthcare",
      description: "Protect patient data, prevent insurance fraud, and secure telehealth services"
    },
    {
      icon: Building2,
      name: "Real Estate",
      description: "Prevent rental scams, secure property transactions, and fight identity theft"
    },
    {
      icon: Briefcase,
      name: "Professional Services",
      description: "Secure client data, prevent payment fraud, and protect business transactions"
    }
  ];

  return (
    <section className="relative z-10 py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            Industries We Protect
          </h2>
          <p className="text-xl text-green-300/80 max-w-3xl mx-auto">
            Our advanced fraud detection system adapts to the unique challenges of every industry
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