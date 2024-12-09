import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/landing/HeroSection";
import { Features } from "@/components/landing/Features";
import { Industries } from "@/components/landing/Industries";
import { UseCases } from "@/components/landing/UseCases";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { Footer } from "@/components/landing/Footer";
import { MatrixBackground } from "@/components/landing/MatrixBackground";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          FraudShield
        </Link>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>

      <MatrixBackground>
        <HeroSection />
      </MatrixBackground>
      
      <Features />
      <Industries />
      <UseCases />
      <PricingPlans />
      <Footer />
    </div>
  );
};

export default Landing;