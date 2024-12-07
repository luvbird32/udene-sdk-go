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
    "name": "Udene Fraud Detection System",
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
        <title>Udene | Enterprise Fraud Detection Platform</title>
        <meta name="description" content="Udene: Enterprise-grade fraud detection system with real-time monitoring, machine learning analytics, and comprehensive compliance reporting." />
        <meta name="keywords" content="udene, fraud detection, cybersecurity, real-time monitoring, machine learning, compliance reporting, risk assessment" />
        <meta property="og:title" content="Udene | Enterprise Fraud Detection Platform" />
        <meta property="og:description" content="Enterprise-grade fraud detection system with real-time monitoring, machine learning analytics, and comprehensive compliance reporting." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://udene.net" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Udene Fraud Detection System" />
        <meta name="twitter:description" content="Enterprise-grade fraud detection with real-time monitoring and ML analytics." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-green-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.1)_0%,transparent_70%)] z-0"></div>
        <MatrixBackground />
        <nav className="glass-nav py-4 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-green-400">Udene</div>
            <div className="space-x-6">
              <a href="#features" className="text-green-300 hover:text-green-400 transition-colors">Features</a>
              <a href="#pricing" className="text-green-300 hover:text-green-400 transition-colors">Pricing</a>
              <a href="#contact" className="glass-button px-4 py-2 rounded-lg text-green-400">Contact</a>
            </div>
          </div>
        </nav>
        <main className="relative z-10 pt-20">
          <HeroSection />
          <div className="glass-section" id="features">
            <Features />
          </div>
          <Industries />
          <div className="glass-section">
            <UseCases />
          </div>
          <div className="glass-section" id="pricing">
            <PricingPlans />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Landing;