
import { Shield, Target, Sparkles, Users } from "lucide-react";

export const WhyMissionObjective = () => {
  return (
    <div className="relative py-32">
      {/* Our Why Section */}
      <div className="container mx-auto px-4 mb-32">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-24 md:-top-28 bg-secondary/10 p-4 rounded-full border border-secondary/20 transform transition-all duration-500 hover:scale-110">
              <Users className="w-10 h-10 md:w-16 md:h-16 text-secondary animate-pulse" />
            </div>
          </div>
          
          <div className="pt-20 md:pt-24">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white">
              Our <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">Why</span>
            </h2>
            <p className="text-base text-white/80 max-w-3xl mx-auto">
              We started Udene because we saw a problem: small and medium-sized businesses were being priced out of proper fraud protection. The existing solutions were either too expensive, too complex, or both. We believed that every business, regardless of size, deserves access to powerful fraud protection without breaking the bank.
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
            <p className="text-base text-white/80 max-w-3xl mx-auto">
              Our mission is simple: make enterprise-grade fraud protection accessible to everyone. We've built a solution that's not just powerful, but also affordable and easy to use. No more complicated setups or expensive implementations - just straightforward protection that works right out of the box.
            </p>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-24 md:-top-28 bg-secondary/10 p-4 rounded-full border border-secondary/20 transform transition-all duration-500 hover:scale-110">
              <Sparkles className="w-10 h-10 md:w-16 md:h-16 text-secondary animate-pulse" />
            </div>
          </div>
          
          <div className="pt-20 md:pt-24">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white">
              Our <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">Objectives</span>
            </h2>
            <div className="space-y-6 text-base text-white/80 max-w-3xl mx-auto">
              <p>
                We're committed to three simple goals:
              </p>
              <ul className="space-y-4">
                <li className="flex items-center justify-center space-x-2">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                  <span>Keep our pricing affordable so businesses of all sizes can protect themselves</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                  <span>Maintain a user-friendly interface that doesn't require a technical degree to understand</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                  <span>Deliver enterprise-level protection without the enterprise-level complexity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
