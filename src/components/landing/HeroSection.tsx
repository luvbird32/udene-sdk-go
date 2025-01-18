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
    <section className="relative z-10 py-32">
      <div className="glass-card p-16 rounded-xl max-w-5xl mx-auto text-center backdrop-blur-lg border border-green-500/20">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500/10 p-4 rounded-full border border-green-400/20">
          <Shield className="w-10 h-10 text-green-400" />
        </div>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text leading-tight">
          Protect Your Revenue From Consumers Exploitation and Fraudulent Behaviors
        </h1>
        
        <p className="text-xl text-green-300/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Industry-leading solution that prevents users from exploiting your systems and engaging in fraudulent behavior. Protect your revenue with advanced behavioral analysis and cross-platform tracking that catches what others miss.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center mb-16">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-7 rounded-lg flex items-center gap-3 text-lg transition-all duration-300 hover:scale-105"
            onClick={handleStartTrial}
          >
            Start Free Trial <ArrowRight className="w-6 h-6" />
          </Button>
        </div>

        <div className="pt-16 border-t border-green-500/20 grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-green-400 mb-3">97%</div>
            <div className="text-green-300/80 text-lg">Fraud Prevention Rate</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-green-400 mb-3">$1M+</div>
            <div className="text-green-300/80 text-lg">Customer Savings</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-green-400 mb-3">500ms</div>
            <div className="text-green-300/80 text-lg">Real-time Detection</div>
          </div>
        </div>
      </div>
    </section>
  );
};