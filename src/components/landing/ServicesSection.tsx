import { services } from "./data/services";
import { ServiceCard } from "./components/ServiceCard";

export const ServicesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
              Protection Services
            </span>
          </h2>
          <p className="text-xl text-gray-300/80 max-w-3xl mx-auto">
            Our suite of advanced protection services ensures complete coverage against various types of fraud and abuse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};