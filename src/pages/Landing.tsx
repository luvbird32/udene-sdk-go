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
      
      <div id="features">
        <Features />
      </div>
      <div id="industries">
        <Industries />
      </div>
      <div id="use-cases">
        <UseCases />
      </div>
      <div id="pricing">
        <PricingPlans />
      </div>
      <div id="about">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;