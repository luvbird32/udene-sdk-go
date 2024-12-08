import { HeroSection } from "@/components/landing/HeroSection";
import { Features } from "@/components/landing/Features";
import { Industries } from "@/components/landing/Industries";
import { UseCases } from "@/components/landing/UseCases";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold">Fraud Detection</div>
          <Button 
            onClick={() => navigate('/login')}
            variant="default"
          >
            Sign In
          </Button>
        </div>
      </nav>
      <div className="pt-16">
        <HeroSection />
        <Features />
        <Industries />
        <UseCases />
        <PricingPlans />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;