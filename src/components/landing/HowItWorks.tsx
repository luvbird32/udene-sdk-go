
import { BusinessSection } from "./how-it-works/BusinessSection";
import { TechnicalSection } from "./how-it-works/TechnicalSection";
import { DetailedExplanation } from "./how-it-works/DetailedExplanation";

export const HowItWorks = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How <span className="text-secondary">Udene</span> Works
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
