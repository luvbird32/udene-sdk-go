
import { ArrowRight, Shield, Zap, DollarSign, Users } from "lucide-react";
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

  const uspFeatures = [
    {
      icon: DollarSign,
      title: "Cost-Effective",
      description: "88% more cost-effective than competitors, with zero feature limitations"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Real-time protection with 35ms response time - detect and prevent fraud instantly"
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Enterprise-grade security made simple - from API to implementation in minutes"
    }
  ];

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16 md:py-32">
      <div className="glass-card p-4 md:p-10 rounded-xl w-full max-w-4xl mx-auto text-center backdrop-blur-lg border border-white/5">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-secondary/10 p-3 rounded-full border border-secondary/20">
          <Shield className="w-8 h-8 text-secondary animate-pulse" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight">
          Unleash the Power of{" "}
          <span className="bg-gradient-to-r from-secondary to-secondary-light text-transparent bg-clip-text">
            Intelligent Fraud Prevention
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Experience next-generation fraud protection that safeguards your business 
          with advanced AI, real-time monitoring, and unmatched precision. 
          Stay ahead of threats while maintaining seamless user experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {uspFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/5 hover:border-secondary/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-12">
          <Button 
            className="w-full sm:w-auto bg-secondary hover:bg-secondary-dark text-white px-8 py-6 rounded-lg flex items-center justify-center gap-3 text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-secondary/20"
            onClick={handleStartTrial}
          >
            Start Free Trial <ArrowRight className="w-6 h-6" />
          </Button>
        </div>

        <div className="pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-6 rounded-lg bg-black/40 backdrop-blur-sm transform hover:scale-105 transition-duration-300">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-2">99.9%</div>
            <div className="text-gray-300">Fraud Prevention Rate</div>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-black/40 backdrop-blur-sm transform hover:scale-105 transition-duration-300">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-2">$10M+</div>
            <div className="text-gray-300">Customer Savings</div>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-black/40 backdrop-blur-sm transform hover:scale-105 transition-duration-300">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-2">35ms</div>
            <div className="text-gray-300">Real-time Detection</div>
          </div>
        </div>
      </div>
    </section>
  );
};
