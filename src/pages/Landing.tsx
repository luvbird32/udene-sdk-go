import { Link } from "react-router-dom";
import { HeroSection } from "@/components/landing/HeroSection";
import { Features } from "@/components/landing/Features";
import { Industries } from "@/components/landing/Industries";
import { UseCases } from "@/components/landing/UseCases";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { Footer } from "@/components/landing/Footer";
import { MatrixBackground } from "@/components/landing/MatrixBackground";
import { Header } from "@/components/landing/Header";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <MatrixBackground>
        <Header />
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