import { useToast } from "@/components/ui/use-toast";
import { Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiDocs } from "@/components/documentation/ApiDocs";
import { DevTools } from "@/components/developer/DevTools";
import { Link } from "react-router-dom";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ComplianceReporting } from "@/components/compliance/ComplianceReporting";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { useRealtimeSubscriptions } from "@/hooks/useRealtimeSubscriptions";
import { Helmet } from "react-helmet";

const Index = () => {
  const { toast } = useToast();
  
  useSessionTimeout();
  useRealtimeSubscriptions();

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      console.log("Fetching metrics from Supabase...");
      const { data: metricsData, error: metricsError } = await supabase
        .from('metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);

      if (metricsError) throw metricsError;

      const { data: recentTransactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('risk_score, is_fraudulent')
        .order('created_at', { ascending: false })
        .limit(100);

      if (transactionsError) throw transactionsError;

      const avgRiskScore = recentTransactions?.reduce((acc, t) => acc + (t.risk_score || 0), 0) / 
        (recentTransactions?.length || 1);

      return {
        riskScore: Math.round(avgRiskScore || 0),
        activeUsers: metricsData?.[0]?.metric_value || 0,
        avgProcessingTime: 35,
        concurrentCalls: metricsData?.[0]?.metric_value || 0
      };
    },
    refetchInterval: 3000,
    retry: 1,
  });

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Advanced Fraud Detection System",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web-based",
    "description": "Enterprise-grade fraud detection and cybersecurity monitoring system with real-time analytics and machine learning capabilities.",
    "offers": {
      "@type": "Offer",
      "price": "Contact for Pricing",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time Fraud Detection",
      "Machine Learning Analytics",
      "Compliance Reporting",
      "API Integration",
      "Risk Assessment"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Advanced Fraud Detection System | Real-time Cybersecurity Monitoring</title>
        <meta name="description" content="Enterprise-grade fraud detection system with real-time monitoring, machine learning analytics, and comprehensive compliance reporting. Protect your business with advanced cybersecurity." />
        <meta name="keywords" content="fraud detection, cybersecurity, real-time monitoring, machine learning, compliance reporting, risk assessment" />
        <meta property="og:title" content="Advanced Fraud Detection System | Real-time Cybersecurity Monitoring" />
        <meta property="og:description" content="Enterprise-grade fraud detection system with real-time monitoring, machine learning analytics, and comprehensive compliance reporting." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Advanced Fraud Detection System" />
        <meta name="twitter:description" content="Enterprise-grade fraud detection with real-time monitoring and ML analytics." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-black text-green-400 p-6 relative overflow-hidden" role="main">
        {/* Matrix-inspired animated background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-green-500 text-xl animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 7}s`
                }}
              >
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section with SEO Content */}
        <section className="relative z-10 mb-16">
          <div className="glass-card p-8 rounded-lg max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 text-green-400 animate-pulse-slow" tabIndex={0}>
              Next-Gen Fraud Detection
            </h1>
            <p className="text-xl text-green-300/90 mb-6" tabIndex={0}>
              Protect your business with advanced AI-powered fraud detection and real-time monitoring
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="glass-card p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-sm text-green-300/80">Instant threat detection and response capabilities</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">ML-Powered</h3>
                <p className="text-sm text-green-300/80">Advanced machine learning algorithms for pattern recognition</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Compliance Ready</h3>
                <p className="text-sm text-green-300/80">Built-in compliance reporting and documentation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Header section */}
        <header className="mb-8 flex justify-between items-center relative z-10">
          <div className="glass-card p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-4xl font-bold mb-2 text-green-400 animate-pulse-slow" tabIndex={0}>
              Fraud Detection System
            </h2>
            <p className="text-green-300/80" tabIndex={0}>
              Advanced monitoring and analysis for cybersecurity threats
            </p>
          </div>
          <Link 
            to="/settings" 
            className="flex items-center gap-2 px-6 py-3 rounded-md hover:bg-green-900/20 transition-all duration-300 glass-card ml-4"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </header>

        {/* Main content */}
        <div className="relative z-10">
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList className="glass-card p-1">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-900/40">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="compliance" className="data-[state=active]:bg-green-900/40">
                Compliance
              </TabsTrigger>
              <TabsTrigger value="docs" className="data-[state=active]:bg-green-900/40">
                API Documentation
              </TabsTrigger>
              <TabsTrigger value="devtools" className="data-[state=active]:bg-green-900/40">
                Developer Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="glass-card p-6 rounded-lg">
              <DashboardContent 
                metrics={metrics}
                metricsLoading={metricsLoading}
                metricsError={metricsError}
              />
            </TabsContent>

            <TabsContent value="compliance" className="glass-card p-6 rounded-lg">
              <ComplianceReporting />
            </TabsContent>

            <TabsContent value="docs" className="glass-card p-6 rounded-lg">
              <ApiDocs />
            </TabsContent>

            <TabsContent value="devtools" className="glass-card p-6 rounded-lg">
              <DevTools />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Index;
