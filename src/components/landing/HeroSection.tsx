
import { ArrowRight, Code, Shield, Star, Lock, Zap, Database } from "lucide-react";
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent blur-2xl opacity-30" />
      
      <div className="w-full max-w-7xl mx-auto relative">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Main heading with enhanced typography and gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Next Generation
            <br />
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">
              AI-Powered Security Platform
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Enterprise-grade protection powered by advanced neural networks.
            Detect and prevent threats in real-time with our intelligent system.
          </p>

          {/* CTA buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Button 
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 h-14 text-lg font-medium transition-all duration-300 hover:scale-105"
              onClick={handleStartTrial}
            >
              Start free trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-green-500/30 text-green-400 hover:bg-green-500/10 h-14 text-lg font-medium transition-all duration-300"
              onClick={() => navigate('/documentation')}
            >
              <Code className="mr-2 h-5 w-5" /> View documentation
            </Button>
          </div>

          {/* Feature cards with glass morphism effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24">
            {[
              {
                icon: Shield,
                title: "Neural Network Defense",
                description: "Advanced AI models process 1M+ threat signals per second"
              },
              {
                icon: Zap,
                title: "Real-Time Protection",
                description: "35ms average response time to security threats"
              },
              {
                icon: Database,
                title: "Enterprise Scale",
                description: "Handle 100M+ daily security checks effortlessly"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-8 rounded-xl bg-black/40 backdrop-blur-sm border border-white/5 hover:border-green-500/20 transition-all duration-500"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-500/10 rounded-lg group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust indicators with refined styling */}
          <div className="pt-24 flex flex-wrap items-center justify-center gap-12">
            {[
              { icon: Shield, text: "SOC 2 Type II Certified" },
              { icon: Lock, text: "GDPR & CCPA Compliant" },
              { icon: Database, text: "99.99% Uptime SLA" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 group">
                <div className="p-2 bg-green-500/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 text-green-400" />
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

