import { Link } from "react-router-dom";
import { HeroSection } from "@/components/landing/HeroSection";
import { Features } from "@/components/landing/Features";
import { Industries } from "@/components/landing/Industries";
import { UseCases } from "@/components/landing/UseCases";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { Footer } from "@/components/landing/Footer";
import { MatrixBackground } from "@/components/landing/MatrixBackground";
import { Header } from "@/components/landing/Header";
import { Compliance } from "@/components/landing/Compliance";
import { Terms } from "@/components/landing/Terms";
import { Testimonials } from "@/components/landing/Testimonials";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyMissionObjective } from "@/components/landing/WhyMissionObjective";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { useEffect } from "react";

const Landing = () => {
  useEffect(() => {
    document.body.setAttribute('data-landing-page', 'true');
    return () => {
      document.body.setAttribute('data-landing-page', 'false');
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MatrixBackground>
        <Header />
        <HeroSection />
      </MatrixBackground>
      
      <div id="why-mission-objective">
        <WhyMissionObjective />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="industries">
        <Industries />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="use-cases">
        <UseCases />
      </div>
      <div id="compliance">
        <Compliance />
      </div>
      <div id="terms">
        <Terms />
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