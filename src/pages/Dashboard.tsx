import { useToast } from "@/components/ui/use-toast";
import { Settings, Users, Shield, Activity, Database, Server, BarChart2, Users2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ComplianceReporting } from "@/components/compliance/ComplianceReporting";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { useRealtimeSubscriptions } from "@/hooks/useRealtimeSubscriptions";
import { AccountTypeIndicator } from "@/components/dashboard/AccountTypeIndicator";
import { SecuritySection } from "@/components/dashboard/SecuritySection";
import { InfrastructureSection } from "@/components/dashboard/InfrastructureSection";
import { DatabaseSection } from "@/components/dashboard/DatabaseSection";
import { ClientAnalytics } from "@/components/dashboard/analytics/ClientAnalytics";
import { UsageAnalytics } from "@/components/dashboard/analytics/UsageAnalytics";
import { UserManagement } from "@/components/dashboard/UserManagement";

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

      return {
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

      {/* Enhanced Header section */}
      <header className="mb-8 flex justify-between items-center relative z-10">
        <div className="glass-card p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-4xl font-bold text-green-400 animate-pulse-slow" tabIndex={0}>
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

      <AccountTypeIndicator />

      <div className="relative z-10">
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="glass-card p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-900/40">
              <Activity className="h-4 w-4 mr-2" />
              System Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-green-900/40">
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="client-analytics" className="data-[state=active]:bg-green-900/40">
              <Users2 className="h-4 w-4 mr-2" />
              Client Analytics
            </TabsTrigger>
            <TabsTrigger value="usage-analytics" className="data-[state=active]:bg-green-900/40">
              <BarChart2 className="h-4 w-4 mr-2" />
              Usage Analytics
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
          </TabsList>

          <TabsContent value="dashboard" className="glass-card p-6 rounded-lg">
            <DashboardContent 
              metrics={metrics}
              metricsLoading={metricsLoading}
              metricsError={metricsError}
            />
          </TabsContent>

          <TabsContent value="users" className="glass-card p-6 rounded-lg">
            <UserManagement />
          </TabsContent>

          <TabsContent value="client-analytics" className="glass-card p-6 rounded-lg">
            <ClientAnalytics />
          </TabsContent>

          <TabsContent value="usage-analytics" className="glass-card p-6 rounded-lg">
            <UsageAnalytics />
          </TabsContent>

          <TabsContent value="security" className="glass-card p-6 rounded-lg">
            <SecuritySection />
          </TabsContent>

          <TabsContent value="infrastructure" className="glass-card p-6 rounded-lg">
            <InfrastructureSection />
          </TabsContent>

          <TabsContent value="database" className="glass-card p-6 rounded-lg">
            <DatabaseSection />
          </TabsContent>

          <TabsContent value="compliance" className="glass-card p-6 rounded-lg">
            <ComplianceReporting />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;