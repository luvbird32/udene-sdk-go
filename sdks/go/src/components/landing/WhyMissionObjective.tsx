
import { Shield, Target, Sparkles, Users, CheckCircle2 } from "lucide-react";

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
            <div className="space-y-8 text-left max-w-3xl mx-auto">
              <p className="text-xl text-white/80 mb-8 text-center">
                We're committed to delivering:
              </p>
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Affordable Protection</h3>
                  <p className="text-white/80">High-quality fraud prevention at a price that works for businesses of all sizes.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ease of Use</h3>
                  <p className="text-white/80">A streamlined, intuitive experience—no technical expertise required.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Enterprise-Level Security</h3>
                  <p className="text-white/80">Advanced protection without enterprise-level complexity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
