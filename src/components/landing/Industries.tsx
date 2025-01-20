import { Shield, Building2, ShoppingCart, Briefcase, Plane, Car, Gamepad, Landmark } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Industries = () => {
  return (
    <section className="relative z-10 py-16 bg-[hsl(222,47%,11%)]">
      <div className="container mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-sm p-6 md:p-10 rounded-xl max-w-4xl mx-auto text-center border border-white/5 mb-10">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary/10 p-3 rounded-full border border-primary/20">
            <Shield className="w-8 h-8 text-primary animate-pulse" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">
            Trusted Across{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text animate-gradient">
              Multiple Industries
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Our fraud prevention platform adapts to the unique challenges of each industry,
            providing tailored protection against evolving threats.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <IndustryCard
            icon={<Landmark className="w-6 h-6" />}
            title="Financial Services"
            description="Protect financial transactions and prevent account takeover."
          />
          
          <IndustryCard
            icon={<ShoppingCart className="w-6 h-6" />}
            title="E-commerce"
            description="Stop payment fraud and protect your revenue."
          />
          
          <IndustryCard
            icon={<Briefcase className="w-6 h-6" />}
            title="Enterprise"
            description="Secure your business operations with comprehensive protection."
          />
          
          <IndustryCard
            icon={<Building2 className="w-6 h-6" />}
            title="Insurance"
            description="Detect fraudulent claims and protect against policy abuse."
          />
          
          <IndustryCard
            icon={<Plane className="w-6 h-6" />}
            title="Travel"
            description="Prevent booking fraud and protect loyalty programs."
          />
          
          <IndustryCard
            icon={<Car className="w-6 h-6" />}
            title="Automotive"
            description="Secure vehicle transactions and prevent financing fraud."
          />
          
          <IndustryCard
            icon={<Gamepad className="w-6 h-6" />}
            title="Gaming"
            description="Stop cheating and protect in-game economies."
          />
          
          <IndustryCard
            icon={<Shield className="w-6 h-6" />}
            title="Technology"
            description="Protect digital assets and prevent unauthorized access."
          />
        </div>
      </div>
    </section>
  );
};

interface IndustryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const IndustryCard = ({ icon, title, description }: IndustryCardProps) => {
  return (
    <Card className="group relative overflow-hidden p-4 bg-black/40 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
      
      <div className="relative space-y-2">
        <div className="inline-flex p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 ease-in-out">
          {icon}
        </div>
        
        <h3 className="text-base font-semibold text-white group-hover:text-primary/90 transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-xs text-gray-300 leading-relaxed group-hover:text-gray-200 transition-all duration-300">
          {description}
        </p>
      </div>
    </Card>
  );
};