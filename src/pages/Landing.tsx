import { Helmet } from "react-helmet";
import { HeroSection } from "@/components/landing/HeroSection";
import { Features } from "@/components/landing/Features";
import { Industries } from "@/components/landing/Industries";
import { UseCases } from "@/components/landing/UseCases";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { Footer } from "@/components/landing/Footer";
import { MatrixBackground } from "@/components/landing/MatrixBackground";

const Landing = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Advanced Fraud Detection System",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web-based",
    "description": "Enterprise-grade fraud detection and cybersecurity monitoring system with real-time analytics and machine learning capabilities.",
    "offers": {
      "@type": "Offer",
      "price": "Contact for Pricing",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time Fraud Detection",
      "Machine Learning Analytics",
      "Compliance Reporting",
      "API Integration",
      "Risk Assessment"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Advanced Fraud Detection System | Enterprise Cybersecurity Platform</title>
        <meta name="description" content="Enterprise-grade fraud detection system with real-time monitoring, machine learning analytics, and comprehensive compliance reporting. Protect your business with advanced cybersecurity." />
        <meta name="keywords" content="fraud detection, cybersecurity, real-time monitoring, machine learning, compliance reporting, risk assessment" />
        <meta property="og:title" content="Advanced Fraud Detection System | Enterprise Cybersecurity Platform" />
        <meta property="og:description" content="Enterprise-grade fraud detection system with real-time monitoring, machine learning analytics, and comprehensive compliance reporting." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Advanced Fraud Detection System" />
        <meta name="twitter:description" content="Enterprise-grade fraud detection with real-time monitoring and ML analytics." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
        <MatrixBackground />
        <main className="relative z-10">
          <HeroSection />
          <Features />
          <Industries />
          <UseCases />
          <PricingPlans />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Landing;