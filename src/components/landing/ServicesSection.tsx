
import { services } from "./data/services";
import { ServiceCard } from "./components/ServiceCard";

export const ServicesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">How </span>
            <span className="text-[#22c55e]">Udene</span>
            <span className="text-white"> Protects Your Business</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Udene's AI-powered platform prevents fraud across your entire business, from payments to user accounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
