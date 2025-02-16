
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
            AI-Powered Fraud Protection for{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
              Modern Business
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stop fraud before it happens with real-time AI monitoring, behavioral analysis, 
            and smart risk assessment. Protect your revenue and customers with enterprise-grade security 
            that scales with your business.
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
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Real-Time Protection</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Detect and prevent fraud in milliseconds with our AI-powered system. 35ms average response time.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-green-500/10 hover:border-green-500/20 transition-all">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Lock className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">99.9% Accuracy</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Industry-leading fraud prevention rate with continuous AI learning and adaptation.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-green-500/10 hover:border-green-500/20 transition-all">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Database className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Enterprise Scale</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Built for high-volume businesses, processing millions of transactions daily.
              </p>
            </div>
          </div>

          <div className="pt-16 flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">99.99% Uptime SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
