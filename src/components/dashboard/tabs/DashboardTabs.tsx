import { Shield, Users2, Activity, Database, Server, BarChart2 } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DashboardTabs = () => {
  return (
    <TabsList className="glass-card p-1">
      <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-900/40">
        <Activity className="h-4 w-4 mr-2" />
        System Overview
      </TabsTrigger>
      <TabsTrigger value="users" className="data-[state=active]:bg-green-900/40">
        <Users2 className="h-4 w-4 mr-2" />
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
  );
};