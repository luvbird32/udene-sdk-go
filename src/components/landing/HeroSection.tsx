
import { ArrowRight, Code, Shield, Star, Lock, Zap, Database, Clock, CheckCircle2, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartTrial = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      navigate('/client-dashboard');
    } else {
      toast({
        title: "Authentication Required",
        description: "Please sign in or create an account to start your free trial.",
      });
      navigate('/login');
    }
  };

  return (
    <section className="relative z-10 min-h-[90vh] flex items-center justify-center px-4 py-16 md:py-32 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url("/lovable-uploads/photo-1487058792275-0ad4aaf24ca7.jpeg")'
        }}
      />
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent blur-2xl opacity-30" />
      
      <div className="w-full max-w-7xl mx-auto relative">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Main heading with enhanced typography and gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Fastest Security
            <br />
            <span className="bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 text-transparent bg-clip-text bg-300% animate-gradient">
              For Protecting Businesses Against Consumer Fraud & Product Exploitation
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Stop bots, payment fraud, and account abuse before they impact your revenue. 
            Udene detects threats 3× faster than traditional solutions, protecting your business 
            in real-time with enterprise-grade security that's easy to use and affordable.
          </p>

          {/* Key benefits with icons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            {[
              { icon: Clock, text: "Blocks fraud in 35ms" },
              { icon: Shield, text: "Prevents revenue loss from abuse" },
              { icon: Zap, text: "Works instantly—no complex setup" }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-300">
                <benefit.icon className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons with trial info */}
          <div className="flex flex-col items-center gap-6 pt-8">
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
              <Button 
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white px-8 h-14 text-lg font-medium transition-all duration-300 hover:scale-105"
                onClick={handleStartTrial}
              >
                <Lock className="mr-2 h-5 w-5" /> Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-secondary/30 text-secondary hover:bg-secondary/10 h-14 text-lg font-medium transition-all duration-300"
                onClick={() => navigate('/documentation')}
              >
                <Code className="mr-2 h-5 w-5" /> View documentation
              </Button>
            </div>
            <p className="text-gray-400 text-sm">
              Try free for 7 days. No credit card required. Cancel anytime.
            </p>
          </div>

          {/* Feature cards with glass morphism effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24">
            {[
              {
                icon: Shield,
                title: "Real-Time Protection",
                description: "Blocks fraud in 35ms with AI-powered behavioral analysis"
              },
              {
                icon: Fingerprint,
                title: "Full-Spectrum Defense",
                description: "Covers bots, payments, identity, APIs, and content abuse"
              },
              {
                icon: Database,
                title: "Enterprise Scale",
                description: "Enterprise security at SMB-friendly pricing"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-8 rounded-xl bg-black/40 backdrop-blur-sm border border-white/5 hover:border-secondary/20 transition-all duration-500"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-secondary transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="pt-24 flex flex-wrap items-center justify-center gap-12">
            {[
              { icon: Shield, text: "SOC 2 Type II & ISO 27001 Certified" },
              { icon: Lock, text: "GDPR, CCPA, PCI DSS Compliant" },
              { icon: Star, text: "99.99% Uptime SLA" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 group">
                <div className="p-2 bg-secondary/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-sm text-gray-400 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
