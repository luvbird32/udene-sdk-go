import { ProjectSelector } from "@/components/client-dashboard/projects/ProjectSelector";

export const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <ProjectSelector />
    </div>
  );
};