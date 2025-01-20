import { Shield, Target, Rocket, Brain, Globe, ShieldCheck, Handshake } from "lucide-react";

export const WhyMissionObjective = () => {
  return (
    <div className="w-full bg-[hsl(222,47%,11%)] py-24">
      {/* Our Why Section */}
      <div className="container mx-auto px-4 mb-32">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary/10 p-4 rounded-full border border-primary/20 transform transition-all duration-500 hover:scale-110">
            <Shield className="w-16 h-16 text-primary animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Our <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">Why</span>
          </h2>
          <div className="max-w-4xl bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5">
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-300">
              In today's digital landscape, businesses face unprecedented challenges from sophisticated fraud schemes and consumer exploitation tactics. We witnessed countless organizations struggling to protect their revenue and maintain trust with their customers.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-gray-300">
              This reality drove us to create a solution that not only detects and prevents fraudulent activities but also ensures legitimate customers have a seamless experience. We believe that every business deserves access to enterprise-grade fraud prevention technology.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5 hover:bg-black/50 transition-all duration-300">
            <Brain className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4 text-white">Innovative Protection</h3>
            <p className="text-gray-300">Leveraging cutting-edge AI and machine learning to stay ahead of emerging threats and fraud patterns.</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5 hover:bg-black/50 transition-all duration-300">
            <ShieldCheck className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4 text-white">Proactive Defense</h3>
            <p className="text-gray-300">Real-time monitoring and instant response to suspicious activities before they impact your bottom line.</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5 hover:bg-black/50 transition-all duration-300">
            <Handshake className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4 text-white">Customer Trust</h3>
            <p className="text-gray-300">Building lasting relationships through secure and frictionless customer experiences.</p>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="container mx-auto px-4 mb-32">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary/10 p-4 rounded-full border border-primary/20 transform transition-all duration-500 hover:scale-110">
            <Target className="w-16 h-16 text-primary animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Our <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">Mission</span>
          </h2>
          <div className="max-w-4xl bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5">
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-300">
              To empower businesses with intelligent fraud prevention solutions that protect revenue, preserve customer relationships, and promote sustainable growth in the digital economy.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-gray-300">
              We're committed to democratizing access to advanced fraud prevention technology, making enterprise-grade protection accessible to businesses of all sizes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5 hover:bg-black/50 transition-all duration-300">
            <Globe className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4 text-white">Global Impact</h3>
            <p className="text-gray-300">Creating a safer digital ecosystem for businesses and consumers worldwide through innovative fraud prevention.</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5 hover:bg-black/50 transition-all duration-300">
            <Rocket className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4 text-white">Continuous Innovation</h3>
            <p className="text-gray-300">Constantly evolving our solutions to stay ahead of emerging threats and fraud techniques.</p>
          </div>
        </div>
      </div>

      {/* Our Objectives Section */}
      <div className="container mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-sm p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center border border-white/5 mb-16 transform transition-all duration-500 hover:border-primary/20">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary/10 p-4 rounded-full border border-primary/20 transform transition-all duration-500 hover:scale-110">
            <Target className="w-16 h-16 text-primary animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Our <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">Objectives</span>
          </h2>
          <div className="max-w-4xl">
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-300">
              We've set ambitious goals to revolutionize fraud prevention and create lasting positive impact in the digital commerce landscape.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5 hover:bg-black/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-white">Revenue Protection</h3>
            <p className="text-gray-300">Reduce fraud-related revenue loss by 95% through advanced detection and prevention mechanisms.</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5 hover:bg-black/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-white">Customer Experience</h3>
            <p className="text-gray-300">Maintain a 99.9% accuracy rate in fraud detection while ensuring smooth transactions for legitimate customers.</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5 hover:bg-black/50 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-white">Technology Leadership</h3>
            <p className="text-gray-300">Pioneer next-generation fraud prevention solutions through continuous innovation and research.</p>
          </div>
        </div>
      </div>
    </div>
  );
};