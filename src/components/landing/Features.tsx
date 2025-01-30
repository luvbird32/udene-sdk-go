import { Shield, Activity, Fingerprint, Brain, Lock, ChartBar } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Features = () => {
  return (
    <section className="relative z-10 py-16 px-4 bg-[hsl(222,47%,11%)]">
      <div className="container mx-auto">
        <div className="bg-black/40 backdrop-blur-sm p-6 md:p-10 rounded-xl max-w-4xl mx-auto text-center border border-white/5 mb-10">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary/10 p-3 rounded-full border border-primary/20">
            <Shield className="w-8 h-8 text-primary animate-pulse" />
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white leading-tight">
            Advanced Protection Features That{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text animate-gradient">
              Others Don't Offer
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Industry-leading security features that set us apart from the competition,
            designed to protect your business at every level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Lock className="w-6 h-6" />}
            title="System Exploitation Prevention"
            description="Industry-first solution that stops users from exploiting your systems through sophisticated pattern detection."
          />
          
          <FeatureCard
            icon={<Fingerprint className="w-6 h-6" />}
            title="Advanced Device Intelligence"
            description="Proprietary device fingerprinting that tracks over 100 unique signals to identify repeat offenders."
          />
          
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="Behavioral AI"
            description="Machine learning models trained on millions of fraud patterns to detect suspicious behavior in real-time."
          />
          
          <FeatureCard
            icon={<Activity className="w-6 h-6" />}
            title="Cross-Platform Protection"
            description="Unified fraud prevention across web, mobile, and API interfaces to stop bad actors."
          />
          
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Account Protection"
            description="Real-time monitoring of user patterns and behavior to prevent unauthorized access."
          />
          
          <FeatureCard
            icon={<ChartBar className="w-6 h-6" />}
            title="Revenue Impact Analytics"
            description="Detailed reporting on prevented fraud attempts and system exploitation patterns."
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
    <Card className="group relative overflow-hidden p-6 bg-black/40 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
      
      <div className="relative space-y-4">
        <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 ease-in-out">
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold text-white group-hover:text-primary/90 transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-all duration-300">
          {description}
        </p>
      </div>
    </Card>
  );
};