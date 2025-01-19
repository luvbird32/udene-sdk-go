import { Shield, Building2, ShoppingCart, Briefcase, Plane, Car, Gamepad, Landmark } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Industries = () => {
  return (
    <section className="relative z-10 py-24 bg-[hsl(222,47%,11%)]">
      <div className="container mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary/10 p-4 rounded-full border border-primary/20 transform transition-all duration-500 hover:scale-110 hover:bg-primary/20">
            <Shield className="w-10 h-10 text-primary animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Trusted Across{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text animate-gradient">
              Multiple Industries
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Our fraud prevention platform adapts to the unique challenges of each industry,
            providing tailored protection against evolving threats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <IndustryCard
            icon={<Landmark className="w-8 h-8" />}
            title="Financial Services"
            description="Protect financial transactions and prevent account takeover with our advanced fraud detection."
          />
          
          <IndustryCard
            icon={<ShoppingCart className="w-8 h-8" />}
            title="E-commerce"
            description="Stop payment fraud and protect your revenue with real-time transaction monitoring."
          />
          
          <IndustryCard
            icon={<Briefcase className="w-8 h-8" />}
            title="Enterprise"
            description="Secure your business operations with comprehensive fraud prevention solutions."
          />
          
          <IndustryCard
            icon={<Building2 className="w-8 h-8" />}
            title="Insurance"
            description="Detect fraudulent claims and protect against policy abuse with AI-powered analysis."
          />
          
          <IndustryCard
            icon={<Plane className="w-8 h-8" />}
            title="Travel"
            description="Prevent booking fraud and protect loyalty programs from exploitation."
          />
          
          <IndustryCard
            icon={<Car className="w-8 h-8" />}
            title="Automotive"
            description="Secure vehicle transactions and prevent financing fraud with advanced verification."
          />
          
          <IndustryCard
            icon={<Gamepad className="w-8 h-8" />}
            title="Gaming"
            description="Stop cheating and protect in-game economies from exploitation and fraud."
          />
          
          <IndustryCard
            icon={<Shield className="w-8 h-8" />}
            title="Technology"
            description="Protect digital assets and prevent unauthorized access with robust security."
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
    <Card className="group relative overflow-hidden p-6 bg-black/40 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
      
      <div className="relative space-y-4">
        <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 ease-in-out">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold text-white group-hover:text-primary/90 transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-all duration-300">
          {description}
        </p>
      </div>
    </Card>
  );
};