
import { ArrowRight, Code, Shield, Star } from "lucide-react";
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
    <section className="relative z-10 min-h-[85vh] flex items-center justify-center px-4 py-16 md:py-32">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight">
            Security that{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
              works
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Automate your fraud detection and safeguard your business with AI-powered protection. 
            Built for developers, trusted by enterprises.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button 
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 h-12 text-base"
              onClick={handleStartTrial}
            >
              Start free trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-green-500/30 text-green-400 hover:bg-green-500/10 h-12 text-base"
              onClick={() => navigate('/documentation')}
            >
              <Code className="mr-2 h-5 w-5" /> View documentation
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-green-500/10 hover:border-green-500/20 transition-all">
              <div className="flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div className="font-semibold text-2xl text-white mb-1">99.9%</div>
              <div className="text-gray-400">Fraud Prevention Rate</div>
            </div>
            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-green-500/10 hover:border-green-500/20 transition-all">
              <div className="flex items-center justify-center mb-3">
                <Star className="h-6 w-6 text-green-400" />
              </div>
              <div className="font-semibold text-2xl text-white mb-1">25k+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-green-500/10 hover:border-green-500/20 transition-all">
              <div className="flex items-center justify-center mb-3">
                <Code className="h-6 w-6 text-green-400" />
              </div>
              <div className="font-semibold text-2xl text-white mb-1">35ms</div>
              <div className="text-gray-400">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
