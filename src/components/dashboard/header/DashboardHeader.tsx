import { ProjectSwitcher } from "@/components/client-dashboard/projects/ProjectSwitcher";

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <ProjectSwitcher />
    </div>
  );
};