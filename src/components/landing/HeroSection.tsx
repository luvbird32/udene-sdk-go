import { ArrowRight, Shield } from "lucide-react";
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
    <section className="relative z-10 py-16 flex items-center justify-center">
      <div className="glass-card p-6 md:p-10 rounded-xl max-w-4xl mx-auto text-center backdrop-blur-lg border border-white/5">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary/10 p-3 rounded-full border border-primary/20">
          <Shield className="w-8 h-8 text-primary animate-pulse" />
        </div>
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white leading-tight">
          Protect Your Revenue From{" "}
          <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
            Consumer Exploitation and Fraud
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Safeguard your business with our enterprise-grade fraud prevention platform. 
          We combine advanced behavioral analysis, machine learning, and real-time monitoring 
          to protect against account takeover, payment fraud, and system exploitation.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-8">
          <Button 
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center gap-2 text-base transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/20"
            onClick={handleStartTrial}
          >
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 rounded-lg bg-black/40 backdrop-blur-sm">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">99.9%</div>
            <div className="text-gray-300 text-sm">Fraud Prevention Rate</div>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-black/40 backdrop-blur-sm">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">$10M+</div>
            <div className="text-gray-300 text-sm">Customer Savings</div>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-black/40 backdrop-blur-sm">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">35ms</div>
            <div className="text-gray-300 text-sm">Real-time Detection</div>
          </div>
        </div>
      </div>
    </section>
  );
};