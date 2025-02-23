
import { LoadingState } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { PricingCard } from "./pricing/PricingCard";
import { usePricingPlans } from "./pricing/usePricingPlans";

export const PricingPlans = () => {
  const { data: plans, isLoading, error } = usePricingPlans();

  if (isLoading) {
    return (
      <section className="py-16 relative z-10 bg-black/40">
        <LoadingState message="Loading pricing plans..." />
      </section>
    );
  }

  if (error) {
    console.error('Pricing plans error:', error);
    return (
      <section className="py-16 relative z-10 bg-black/40">
        <ErrorState error={error as Error} />
      </section>
    );
  }

  return (
    <section className="py-16 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
            Choose Your Security Level
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Flexible pricing options that grow with your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans?.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};
