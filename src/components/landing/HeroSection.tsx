
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
    <section className="relative z-10 min-h-[85vh] flex items-center justify-center px-4 py-16 md:py-32">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight">
            Protect Your Digital Assets with{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
              Next-Gen AI Security
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience enterprise-grade protection powered by advanced AI. Safeguard your business 
            from emerging threats with real-time monitoring and intelligent risk assessment.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-green-500/10 hover:border-green-500/20 transition-all">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Intelligent Protection</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Neural networks trained on billions of data points detect threats in milliseconds.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-green-500/10 hover:border-green-500/20 transition-all">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Real-Time Response</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Automated threat response with 35ms average detection and prevention time.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-green-500/10 hover:border-green-500/20 transition-all">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Database className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Scalable Security</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Infrastructure that scales with your business, handling millions of checks daily.
              </p>
            </div>
          </div>

          <div className="pt-16 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">SOC 2 Type II</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">99.99% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
