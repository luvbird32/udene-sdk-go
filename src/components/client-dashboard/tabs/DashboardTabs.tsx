
import { Shield, Layers, FileText, Code, Webhook, Settings, UserRound, Search } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DashboardTabs = () => {
  return (
    <TabsList className="grid w-full grid-cols-9 bg-black/5 p-1 rounded-lg">
      <TabsTrigger 
        value="dashboard" 
        className="text-foreground hover:text-primary data-[state=active]:bg-[#22C55E]/10 data-[state=active]:text-[#22C55E] transition-all duration-200"
      >
        <Shield className="h-4 w-4 mr-2" />
        Dashboard
      </TabsTrigger>
      <TabsTrigger 
        value="services" 
        className="text-foreground hover:text-primary data-[state=active]:bg-[#22C55E]/10 data-[state=active]:text-[#22C55E] transition-all duration-200"
      >
        <Layers className="h-4 w-4 mr-2" />
        Services
      </TabsTrigger>
      <TabsTrigger 
        value="security" 
        className="text-foreground hover:text-primary data-[state=active]:bg-[#22C55E]/10 data-[state=active]:text-[#22C55E] transition-all duration-200"
      >
        <Shield className="h-4 w-4 mr-2" />
        Security
      </TabsTrigger>
      <TabsTrigger 
        value="reports" 
        className="text-foreground hover:text-primary data-[state=active]:bg-[#22C55E]/10 data-[state=active]:text-[#22C55E] transition-all duration-200"
      >
        <FileText className="h-4 w-4 mr-2" />
        Reports
      </TabsTrigger>
      <TabsTrigger 
        value="api" 
        className="text-foreground hover:text-primary data-[state=active]:bg-[#22C55E]/10 data-[state=active]:text-[#22C55E] transition-all duration-200"
      >
        <Code className="h-4 w-4 mr-2" />
        API & SDKs
      </TabsTrigger>
      <TabsTrigger 
        value="webhooks" 
        className="text-foreground hover:text-primary data-[state=active]:bg-[#22C55E]/10 data-[state=active]:text-[#22C55E] transition-all duration-200"
      >
        <Webhook className="h-4 w-4 mr-2" />
        Webhooks
      </TabsTrigger>
      <TabsTrigger 
        value="triggers" 
        className="text-foreground hover:text-primary data-[state=active]:bg-[#22C55E]/10 data-[state=active]:text-[#22C55E] transition-all duration-200"
      >
        <Settings className="h-4 w-4 mr-2" />
        Triggers
      </TabsTrigger>
      <TabsTrigger 
        value="profile" 
        className="text-foreground hover:text-primary data-[state=active]:bg-[#22C55E]/10 data-[state=active]:text-[#22C55E] transition-all duration-200"
      >
        <UserRound className="h-4 w-4 mr-2" />
        Profile
      </TabsTrigger>
      <TabsTrigger 
        value="investigations" 
        className="text-foreground hover:text-primary data-[state=active]:bg-[#22C55E]/10 data-[state=active]:text-[#22C55E] transition-all duration-200"
      >
        <Search className="h-4 w-4 mr-2" />
        Investigations
      </TabsTrigger>
    </TabsList>
  );
};
