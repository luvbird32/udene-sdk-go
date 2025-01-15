import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProject } from "@/contexts/ProjectContext";

export const DashboardTabs = () => {
  const { currentProject } = useProject();

  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        <TabsTrigger value="triggers">Triggers</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="investigations">Investigations</TabsTrigger>
        {currentProject && (
          <TabsTrigger value="project-settings">Project Settings</TabsTrigger>
        )}
        <TabsTrigger value="project-management">Projects</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};