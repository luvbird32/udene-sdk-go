import { Shield, Layers, FileText, Code, Webhook, Settings, UserRound, Search } from "lucide-react";
import { TabsTrigger } from "@/components/ui/tabs";

export const DashboardTabs = () => {
  return (
    <>
      <TabsTrigger value="dashboard">
        <Shield className="h-4 w-4 mr-2" />
        Dashboard
      </TabsTrigger>
      <TabsTrigger value="services">
        <Layers className="h-4 w-4 mr-2" />
        Services
      </TabsTrigger>
      <TabsTrigger value="security">
        <Shield className="h-4 w-4 mr-2" />
        Security
      </TabsTrigger>
      <TabsTrigger value="reports">
        <FileText className="h-4 w-4 mr-2" />
        Reports
      </TabsTrigger>
      <TabsTrigger value="api">
        <Code className="h-4 w-4 mr-2" />
        API & SDKs
      </TabsTrigger>
      <TabsTrigger value="webhooks">
        <Webhook className="h-4 w-4 mr-2" />
        Webhooks
      </TabsTrigger>
      <TabsTrigger value="triggers">
        <Settings className="h-4 w-4 mr-2" />
        Triggers
      </TabsTrigger>
      <TabsTrigger value="profile">
        <UserRound className="h-4 w-4 mr-2" />
        Profile
      </TabsTrigger>
      <TabsTrigger value="investigations">
        <Search className="h-4 w-4 mr-2" />
        Investigations
      </TabsTrigger>
    </>
  );
};