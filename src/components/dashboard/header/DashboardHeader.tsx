import { ProjectSwitcher } from "@/components/client-dashboard/projects/ProjectSwitcher";

export const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-green-500/20">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-green-400">Dashboard</h1>
        <ProjectSwitcher />
      </div>
    </div>
  );
};