import { DashboardTabContent } from "@/components/dashboard/tabs/DashboardTabContent";
import { DashboardTabs } from "@/components/dashboard/tabs/DashboardTabs";
import { ProjectSelector } from "@/components/dashboard/ProjectSelector";
import { Tabs } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <ProjectSelector />
      <Tabs defaultValue="dashboard" className="space-y-6">
        <DashboardTabs />
        <DashboardTabContent />
      </Tabs>
    </div>
  );
};

export default Dashboard;