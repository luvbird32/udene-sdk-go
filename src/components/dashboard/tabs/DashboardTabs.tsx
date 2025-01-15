import { Activity } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DashboardTabs = () => {
  return (
    <TabsList className="glass-card p-1">
      <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-900/40">
        <Activity className="h-4 w-4 mr-2" />
        System Overview
      </TabsTrigger>
    </TabsList>
  );
};