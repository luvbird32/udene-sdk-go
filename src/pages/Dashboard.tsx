import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ProjectSelector } from "@/components/dashboard/ProjectSelector";
import { ProjectManagement } from "@/components/dashboard/ProjectManagement";
import { useProject } from "@/contexts/ProjectContext";

const Dashboard = () => {
  const { currentProject } = useProject();

  return (
    <div className="container mx-auto py-6 space-y-8">
      <ProjectSelector />
      
      {currentProject ? (
        <DashboardContent />
      ) : (
        <ProjectManagement />
      )}
    </div>
  );
};

export default Dashboard;