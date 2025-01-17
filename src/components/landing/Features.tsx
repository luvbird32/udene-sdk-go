import { Shield, Activity, Fingerprint, Globe, Bell, Lock, MousePointer, Network, Brain, Database, UserCheck, ChartBar } from "lucide-react";

export const Features = () => {
  return (
    <section className="py-24 bg-black/40">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-green-400">
          Advanced Fraud Prevention Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MousePointer className="w-8 h-8 text-green-400" />}
            title="Behavioral Analysis"
            description="Advanced pattern detection for mouse movements, typing patterns, and user navigation with real-time session monitoring."
          />
          
          <FeatureCard
            icon={<Network className="w-8 h-8 text-green-400" />}
            title="Network Intelligence"
            description="Comprehensive IP reputation database, VPN detection, and geographic anomaly monitoring with connection fingerprinting."
          />
          
          <FeatureCard
            icon={<Fingerprint className="w-8 h-8 text-green-400" />}
            title="Device Fingerprinting"
            description="Multi-factor device recognition including hardware, browser, and network characteristics for precise identification."
          />
          
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-green-400" />}
            title="ML-Powered Analysis"
            description="Real-time risk assessment using supervised and unsupervised learning with continuous model updates."
          />
          
          <FeatureCard
            icon={<Database className="w-8 h-8 text-green-400" />}
            title="Secure Infrastructure"
            description="End-to-end encryption, data masking, and comprehensive audit logging with real-time threat monitoring."
          />
          
          <FeatureCard
            icon={<ChartBar className="w-8 h-8 text-green-400" />}
            title="Business Intelligence"
            description="Custom dashboards, real-time monitoring, and comprehensive analytics with automated reporting."
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