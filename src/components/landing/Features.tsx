import { Shield, Activity, Fingerprint, Globe, Bell, Lock } from "lucide-react";

export const Features = () => {
  return (
    <section className="py-24 bg-black/40">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-green-400">
          Comprehensive Fraud Prevention
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Activity className="w-8 h-8 text-green-400" />}
            title="Behavioral Analysis"
            description="Track mouse movements, typing patterns, navigation behavior, and session analysis in real-time."
          />
          
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-green-400" />}
            title="Network Intelligence"
            description="Detect VPNs, analyze IP reputation, identify geographic anomalies, and monitor connection patterns."
          />
          
          <FeatureCard
            icon={<Fingerprint className="w-8 h-8 text-green-400" />}
            title="Device Fingerprinting"
            description="Advanced device recognition with hardware, browser, and network fingerprinting capabilities."
          />
          
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-green-400" />}
            title="Risk Assessment"
            description="ML-powered risk scoring using historical behavior, device reputation, and transaction patterns."
          />
          
          <FeatureCard
            icon={<Bell className="w-8 h-8 text-green-400" />}
            title="Real-time Monitoring"
            description="Instant alerts, custom dashboards, and comprehensive analytics for fraud prevention."
          />
          
          <FeatureCard
            icon={<Lock className="w-8 h-8 text-green-400" />}
            title="Security & Compliance"
            description="GDPR compliant with end-to-end encryption, data masking, and comprehensive audit logging."
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