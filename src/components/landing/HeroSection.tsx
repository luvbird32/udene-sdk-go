
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
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/photo-1488590528505-98d2b5aba04b"
          alt="Technology Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="w-full max-w-6xl mx-auto relative">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20 mb-4">
            <Star className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm text-green-400">Trusted by Fortune 500 companies</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight">
                AI-Powered Fraud Protection for{" "}
                <span className="bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
                  Modern Business
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl leading-relaxed">
                Stop fraud before it happens with real-time AI monitoring, behavioral analysis, 
                and smart risk assessment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
            </div>

            <div className="relative">
              <img
                src="/photo-1581091226825-a6a2a5aee158"
                alt="Secure Business Operations"
                className="rounded-lg shadow-2xl border border-green-500/20"
              />
              <div className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-green-500/20">
                <img
                  src="/photo-1487058792275-0ad4aaf24ca7"
                  alt="AI Technology"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            </div>
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

          <div className="pt-16 flex flex-wrap items-center justify-center gap-8">
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
