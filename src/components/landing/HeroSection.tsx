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
    <section className="relative z-10 py-24">
      <div className="glass-card p-12 rounded-xl max-w-5xl mx-auto text-center backdrop-blur-lg border border-green-500/20">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500/10 p-4 rounded-full border border-green-400/20">
          <Shield className="w-8 h-8 text-green-400" />
        </div>
        
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Stop Bad Actors Before They Cost You Money
        </h1>
        
        <p className="text-xl text-green-300/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Industry-leading fraud prevention that stops trial abuse, account takeovers, and system exploitation. Protect your revenue with real-time behavioral analysis and machine learning that catches what others miss.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-lg flex items-center gap-2 text-lg transition-all duration-300 hover:scale-105"
            onClick={handleStartTrial}
          >
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-12 pt-12 border-t border-green-500/20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-green-400 mb-2">97%</div>
            <div className="text-green-300/80">Trial Abuse Prevention Rate</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-green-400 mb-2">500ms</div>
            <div className="text-green-300/80">Real-time Detection</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-green-400 mb-2">$1M+</div>
            <div className="text-green-300/80">Customer Savings</div>
          </div>
        </div>
      </div>
    </section>
  );
};