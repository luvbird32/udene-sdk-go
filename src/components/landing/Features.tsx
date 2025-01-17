import { Shield, Activity, Fingerprint, Brain, Lock, ChartBar } from "lucide-react";

export const Features = () => {
  return (
    <section className="py-24 bg-black/40">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-green-400">
          Advanced Protection Features That Others Don't Offer
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Lock className="w-8 h-8 text-green-400" />}
            title="System Exploitation Prevention"
            description="Industry-first solution that stops users from exploiting your systems through sophisticated pattern detection and cross-platform tracking."
          />
          
          <FeatureCard
            icon={<Fingerprint className="w-8 h-8 text-green-400" />}
            title="Advanced Device Intelligence"
            description="Proprietary device fingerprinting that tracks over 100 unique signals to identify repeat offenders, even when they switch devices or use VPNs."
          />
          
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-green-400" />}
            title="Behavioral AI"
            description="Machine learning models trained on millions of fraud patterns to detect suspicious behavior in real-time before it impacts your business."
          />
          
          <FeatureCard
            icon={<Activity className="w-8 h-8 text-green-400" />}
            title="Cross-Platform Protection"
            description="Unified fraud prevention across web, mobile, and API interfaces to stop bad actors from finding weak points in your system."
          />
          
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-green-400" />}
            title="Account Protection"
            description="Real-time monitoring of user patterns, device changes, and behavior to prevent unauthorized access and fraudulent activities."
          />
          
          <FeatureCard
            icon={<ChartBar className="w-8 h-8 text-green-400" />}
            title="Revenue Impact Analytics"
            description="Detailed reporting on prevented fraud attempts, saved revenue, and system exploitation patterns to demonstrate clear ROI."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="glass-card p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-green-400">{title}</h3>
      <p className="text-green-300/80">{description}</p>
    </div>
  );
};