import { Target, Heart, Lightbulb } from "lucide-react";

const CompanyValues = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black/40 to-black/60">
      <div className="container mx-auto px-4 space-y-32">
        {/* Why Section */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-6">
            <Heart className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-center text-primary">Why We Exist</h2>
          </div>
          <p className="text-xl text-primary-foreground text-center mb-8">
            In today's digital landscape, businesses face unprecedented challenges from sophisticated fraud and system exploitation. We witnessed countless organizations struggling to protect their resources, revenue, and reputation from evolving threats.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-lg text-primary-foreground/90">
            <div className="space-y-4">
              <p>Every year, businesses lose billions to various forms of digital fraud and system exploitation. Traditional security measures often fail to adapt to new threats, leaving organizations vulnerable to sophisticated attacks.</p>
              <p>We believe that every business, regardless of size, deserves access to enterprise-grade protection that evolves with the threat landscape.</p>
            </div>
            <div className="space-y-4">
              <p>Our founders experienced firsthand the limitations of existing solutions - they were either too rigid, focused on single-point solutions, or failed to provide comprehensive protection against emerging threats.</p>
              <p>This realization led to the creation of our adaptive, AI-powered platform that provides holistic protection against all forms of digital exploitation.</p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-6">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-center text-primary">Our Mission</h2>
          </div>
          <p className="text-xl text-primary-foreground text-center mb-12">
            To empower businesses with intelligent, adaptive security solutions that protect against all forms of digital exploitation while fostering sustainable growth and trust in the digital economy.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/30 p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-semibold text-primary mb-4">Protect</h3>
              <p className="text-primary-foreground/90">Safeguard businesses from financial losses and reputation damage through advanced threat detection and prevention.</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-semibold text-primary mb-4">Innovate</h3>
              <p className="text-primary-foreground/90">Continuously evolve our technology to stay ahead of emerging threats and provide cutting-edge protection.</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-semibold text-primary mb-4">Empower</h3>
              <p className="text-primary-foreground/90">Enable businesses to grow confidently by providing them with the tools and insights they need to thrive securely.</p>
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-6">
            <Lightbulb className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-center text-primary">Our Objectives</h2>
          </div>
          <p className="text-xl text-primary-foreground text-center mb-12">
            We're committed to creating a safer digital ecosystem where businesses can operate with confidence and security.
          </p>
          <div className="space-y-6">
            <div className="bg-black/30 p-8 rounded-lg border border-primary/20">
              <h3 className="text-2xl font-semibold text-primary mb-4">Universal Protection</h3>
              <p className="text-primary-foreground/90 mb-4">Develop and maintain comprehensive security solutions that protect against all forms of digital exploitation, from basic fraud attempts to sophisticated system manipulation.</p>
              <ul className="list-disc list-inside text-primary-foreground/90 space-y-2">
                <li>Implement AI-powered threat detection across all protection layers</li>
                <li>Provide real-time monitoring and response capabilities</li>
                <li>Maintain industry-leading accuracy in threat detection</li>
              </ul>
            </div>
            
            <div className="bg-black/30 p-8 rounded-lg border border-primary/20">
              <h3 className="text-2xl font-semibold text-primary mb-4">Continuous Innovation</h3>
              <p className="text-primary-foreground/90 mb-4">Stay at the forefront of security technology through continuous research and development of new protection mechanisms.</p>
              <ul className="list-disc list-inside text-primary-foreground/90 space-y-2">
                <li>Invest in advanced machine learning capabilities</li>
                <li>Develop new methods for pattern recognition and threat detection</li>
                <li>Enhance cross-platform tracking and protection mechanisms</li>
              </ul>
            </div>
            
            <div className="bg-black/30 p-8 rounded-lg border border-primary/20">
              <h3 className="text-2xl font-semibold text-primary mb-4">Customer Success</h3>
              <p className="text-primary-foreground/90 mb-4">Ensure our clients achieve maximum protection while maintaining operational efficiency and user experience.</p>
              <ul className="list-disc list-inside text-primary-foreground/90 space-y-2">
                <li>Provide comprehensive onboarding and support</li>
                <li>Deliver actionable insights and recommendations</li>
                <li>Maintain high standards of customer satisfaction</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;