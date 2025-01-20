import { BusinessSection } from "./how-it-works/BusinessSection";
import { TechnicalSection } from "./how-it-works/TechnicalSection";
import { DetailedExplanation } from "./how-it-works/DetailedExplanation";

export const HowItWorks = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">Udene</span> Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Simple to understand, powerful to protect
          </p>
        </div>

        <BusinessSection />
        <TechnicalSection />
        <DetailedExplanation />
      </div>
    </section>
  );
};