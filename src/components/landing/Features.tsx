import { Shield, Activity, Fingerprint, Brain, Lock, ChartBar } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Features = () => {
  return (
    <section className="relative z-10 py-24 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="glass-card p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center backdrop-blur-lg border border-primary/10 mb-16">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary/5 p-4 rounded-full border border-primary/20">
            <Shield className="w-10 h-10 text-primary animate-pulse-slow" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent mb-6">
            Advanced Protection Features
          </h2>
          <p className="text-primary/80 text-lg md:text-xl max-w-2xl mx-auto">
            Industry-leading security features that set us apart from the competition
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Lock className="w-8 h-8" />}
            title="System Exploitation Prevention"
            description="Industry-first solution that stops users from exploiting your systems through sophisticated pattern detection and cross-platform tracking."
          />
          
          <FeatureCard
            icon={<Fingerprint className="w-8 h-8" />}
            title="Advanced Device Intelligence"
            description="Proprietary device fingerprinting that tracks over 100 unique signals to identify repeat offenders, even when they switch devices or use VPNs."
          />
          
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="Behavioral AI"
            description="Machine learning models trained on millions of fraud patterns to detect suspicious behavior in real-time before it impacts your business."
          />
          
          <FeatureCard
            icon={<Activity className="w-8 h-8" />}
            title="Cross-Platform Protection"
            description="Unified fraud prevention across web, mobile, and API interfaces to stop bad actors from finding weak points in your system."
          />
          
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Account Protection"
            description="Real-time monitoring of user patterns, device changes, and behavior to prevent unauthorized access and fraudulent activities."
          />
          
          <FeatureCard
            icon={<ChartBar className="w-8 h-8" />}
            title="Revenue Impact Analytics"
            description="Detailed reporting on prevented fraud attempts, saved revenue, and system exploitation patterns to demonstrate clear ROI."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="group relative overflow-hidden p-6 bg-black/40 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative space-y-4">
        <div className="inline-flex p-2 rounded-lg bg-primary/5 text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold text-primary group-hover:text-primary/90 transition-colors">
          {title}
        </h3>
        
        <p className="text-primary/70 leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};