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
    <section className="relative z-10 min-h-[90vh] flex items-center justify-center py-20">
      <div className="glass-card p-8 md:p-16 rounded-xl max-w-5xl mx-auto text-center backdrop-blur-lg border border-white/5">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary/10 p-4 rounded-full border border-primary/20">
          <Shield className="w-10 h-10 text-primary animate-pulse" />
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
          Protect Your Revenue From{" "}
          <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
            Consumer Exploitation and Fraud
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Safeguard your business with our enterprise-grade fraud prevention platform. 
          We combine advanced behavioral analysis, machine learning, and real-time monitoring 
          to protect against account takeover, payment fraud, and system exploitation.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center mb-16">
          <Button 
            className="bg-primary hover:bg-primary-dark text-white px-8 py-6 rounded-lg flex items-center gap-3 text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/20"
            onClick={handleStartTrial}
          >
            Start Free Trial <ArrowRight className="w-6 h-6" />
          </Button>
        </div>

        <div className="pt-12 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 rounded-lg bg-black/40 backdrop-blur-sm">
            <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-gray-300 text-lg">Fraud Prevention Rate</div>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-black/40 backdrop-blur-sm">
            <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">$10M+</div>
            <div className="text-gray-300 text-lg">Customer Savings</div>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-black/40 backdrop-blur-sm">
            <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">35ms</div>
            <div className="text-gray-300 text-lg">Real-time Detection</div>
          </div>
        </div>
      </div>
    </section>
  );
};