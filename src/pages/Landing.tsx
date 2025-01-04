import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/landing/HeroSection";
import { Features } from "@/components/landing/Features";
import { Industries } from "@/components/landing/Industries";
import { UseCases } from "@/components/landing/UseCases";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { Compliance } from "@/components/landing/Compliance";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <Features />
        <Industries />
        <UseCases />
        <PricingPlans />
        <Compliance />
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;