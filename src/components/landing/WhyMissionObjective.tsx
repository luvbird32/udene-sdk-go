
import { Shield, Target } from "lucide-react";

export const WhyMissionObjective = () => {
  return (
    <div className="relative py-32">
      {/* Our Why Section */}
      <div className="container mx-auto px-4 mb-32">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          {/* Icon container with adjusted positioning */}
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-24 md:-top-28 bg-secondary/10 p-4 rounded-full border border-secondary/20 transform transition-all duration-500 hover:scale-110">
              <Shield className="w-10 h-10 md:w-16 md:h-16 text-secondary animate-pulse" />
            </div>
          </div>
          
          {/* Content container with increased padding for desktop */}
          <div className="pt-20 md:pt-24">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white">
              Our <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">Why</span>
            </h2>
            <p className="text-base text-white/80">
              We believe in creating solutions that not only address the needs of our clients but also contribute positively to society. Our mission is to empower businesses with the tools they need to succeed while maintaining ethical standards.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-24 md:-top-28 bg-secondary/10 p-4 rounded-full border border-secondary/20 transform transition-all duration-500 hover:scale-110">
              <Target className="w-10 h-10 md:w-16 md:h-16 text-secondary animate-pulse" />
            </div>
          </div>
          
          <div className="pt-20 md:pt-24">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white">
              Our <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">Mission</span>
            </h2>
            <p className="text-base text-white/80">
              Our mission is to deliver innovative solutions that enhance operational efficiency and drive growth for our clients. We strive to be a trusted partner in their journey towards success.
            </p>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-24 md:-top-28 bg-secondary/10 p-4 rounded-full border border-secondary/20 transform transition-all duration-500 hover:scale-110">
              <Target className="w-10 h-10 md:w-16 md:h-16 text-secondary animate-pulse" />
            </div>
          </div>
          
          <div className="pt-20 md:pt-24">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white">
              Our <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">Objectives</span>
            </h2>
            <p className="text-base text-white/80">
              We aim to achieve excellence in service delivery, foster innovation, and maintain a commitment to sustainability. Our objectives guide us in making impactful decisions that benefit our clients and the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
