import { Shield, Target, Rocket, Brain, Globe, ShieldCheck, Handshake } from "lucide-react";

export const WhyMissionObjective = () => {
  return (
    <div className="w-full bg-gradient-to-b from-secondary-dark via-background to-secondary-dark py-24">
      {/* Our Why Section */}
      <div className="container mx-auto px-4 mb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <Shield className="w-16 h-16 mb-6 text-primary animate-pulse" />
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Our Why
          </h2>
          <div className="max-w-4xl">
            <p className="text-xl leading-relaxed mb-6 text-primary-light">
              In today's digital landscape, businesses face unprecedented challenges from sophisticated fraud schemes and consumer exploitation tactics. We witnessed countless organizations struggling to protect their revenue and maintain trust with their customers.
            </p>
            <p className="text-xl leading-relaxed text-primary-light">
              This reality drove us to create a solution that not only detects and prevents fraudulent activities but also ensures legitimate customers have a seamless experience. We believe that every business deserves access to enterprise-grade fraud prevention technology.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="glass-card p-8 rounded-xl">
            <Brain className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4 text-primary-light">Innovative Protection</h3>
            <p className="text-primary">Leveraging cutting-edge AI and machine learning to stay ahead of emerging threats and fraud patterns.</p>
          </div>
          <div className="glass-card p-8 rounded-xl">
            <ShieldCheck className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4 text-primary-light">Proactive Defense</h3>
            <p className="text-primary">Real-time monitoring and instant response to suspicious activities before they impact your bottom line.</p>
          </div>
          <div className="glass-card p-8 rounded-xl">
            <Handshake className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4 text-primary-light">Customer Trust</h3>
            <p className="text-primary">Building lasting relationships through secure and frictionless customer experiences.</p>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="container mx-auto px-4 mb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <Target className="w-16 h-16 mb-6 text-primary animate-pulse" />
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Our Mission
          </h2>
          <div className="max-w-4xl">
            <p className="text-xl leading-relaxed mb-6 text-primary">
              To empower businesses with intelligent fraud prevention solutions that protect revenue, preserve customer relationships, and promote sustainable growth in the digital economy.
            </p>
            <p className="text-xl leading-relaxed text-primary">
              We're committed to democratizing access to advanced fraud prevention technology, making enterprise-grade protection accessible to businesses of all sizes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="glass-card p-8 rounded-xl">
            <Globe className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4 text-primary-light">Global Impact</h3>
            <p className="text-primary">Creating a safer digital ecosystem for businesses and consumers worldwide through innovative fraud prevention.</p>
          </div>
          <div className="glass-card p-8 rounded-xl">
            <Rocket className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4 text-primary-light">Continuous Innovation</h3>
            <p className="text-primary">Constantly evolving our solutions to stay ahead of emerging threats and fraud techniques.</p>
          </div>
        </div>
      </div>

      {/* Our Objectives Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <Target className="w-16 h-16 mb-6 text-primary animate-pulse" />
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Our Objectives
          </h2>
          <div className="max-w-4xl">
            <p className="text-xl leading-relaxed mb-6 text-primary">
              We've set ambitious goals to revolutionize fraud prevention and create lasting positive impact in the digital commerce landscape.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-primary-light">Revenue Protection</h3>
            <p className="text-primary">Reduce fraud-related revenue loss by 95% through advanced detection and prevention mechanisms.</p>
          </div>
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-primary-light">Customer Experience</h3>
            <p className="text-primary">Maintain a 99.9% accuracy rate in fraud detection while ensuring smooth transactions for legitimate customers.</p>
          </div>
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-primary-light">Technology Leadership</h3>
            <p className="text-primary">Pioneer next-generation fraud prevention solutions through continuous innovation and research.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
