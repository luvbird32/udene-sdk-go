import { useToast } from "@/components/ui/use-toast";
import { Settings, Users, Shield, Activity, Database, Server } from "lucide-react";
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
import { AccountTypeIndicator } from "@/components/dashboard/AccountTypeIndicator";

const Dashboard = () => {
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

      const validTransactions = recentTransactions?.filter(t => t?.risk_score != null) ?? [];
      const avgRiskScore = validTransactions.length > 0
        ? validTransactions.reduce((acc, t) => acc + (t.risk_score ?? 0), 0) / validTransactions.length
        : 0;

      return {
        riskScore: Math.round(avgRiskScore),
        activeUsers: metricsData?.[0]?.metric_value ?? 0,
        avgProcessingTime: 35,
        concurrentCalls: metricsData?.[0]?.metric_value ?? 0
      };
    },
    refetchInterval: 3000,
    retry: 1,
  });

  return (
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

      {/* Enhanced Header section with more admin controls */}
      <header className="mb-8 flex justify-between items-center relative z-10">
        <div className="glass-card p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-4xl font-bold mb-2 text-green-400 animate-pulse-slow" tabIndex={0}>
            Admin Control Center
          </h2>
          <p className="text-green-300/80" tabIndex={0}>
            Advanced system monitoring and management interface
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/users" 
            className="flex items-center gap-2 px-6 py-3 rounded-md hover:bg-green-900/20 transition-all duration-300 glass-card"
          >
            <Users className="h-5 w-5" />
            <span>Users</span>
          </Link>
          <Link 
            to="/settings" 
            className="flex items-center gap-2 px-6 py-3 rounded-md hover:bg-green-900/20 transition-all duration-300 glass-card"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </header>

      {/* Account Type Indicator */}
      <AccountTypeIndicator />

      {/* Enhanced Main content with more admin-focused tabs */}
      <div className="relative z-10">
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="glass-card p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-900/40">
              <Activity className="h-4 w-4 mr-2" />
              System Overview
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-green-900/40">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="data-[state=active]:bg-green-900/40">
              <Server className="h-4 w-4 mr-2" />
              Infrastructure
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-green-900/40">
              <Database className="h-4 w-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-green-900/40">
              <Shield className="h-4 w-4 mr-2" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-green-900/40">
              API Docs
            </TabsTrigger>
            <TabsTrigger value="devtools" className="data-[state=active]:bg-green-900/40">
              Developer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="glass-card p-6 rounded-lg">
            <DashboardContent 
              metrics={metrics}
              metricsLoading={metricsLoading}
              metricsError={metricsError}
            />
          </TabsContent>

          <TabsContent value="security" className="glass-card p-6 rounded-lg">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Security Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Security content will be implemented in future updates */}
                <div className="p-4 border border-green-500/20 rounded-lg">
                  <p>Active Security Protocols</p>
                </div>
                <div className="p-4 border border-green-500/20 rounded-lg">
                  <p>Threat Detection</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="infrastructure" className="glass-card p-6 rounded-lg">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Infrastructure Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Infrastructure content will be implemented in future updates */}
                <div className="p-4 border border-green-500/20 rounded-lg">
                  <p>Server Status</p>
                </div>
                <div className="p-4 border border-green-500/20 rounded-lg">
                  <p>Resource Usage</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="database" className="glass-card p-6 rounded-lg">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Database Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Database content will be implemented in future updates */}
                <div className="p-4 border border-green-500/20 rounded-lg">
                  <p>Database Health</p>
                </div>
                <div className="p-4 border border-green-500/20 rounded-lg">
                  <p>Query Performance</p>
                </div>
              </div>
            </div>
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
  );
};

export default Dashboard;