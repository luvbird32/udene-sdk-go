
import { ProjectSelect } from "../ProjectSelect";
import { ProjectDialog } from "../ProjectDialog";
import { useProject } from "@/contexts/ProjectContext";
import { useProjectCreation } from "../hooks/useProjectCreation";

export const ProjectSelection = () => {
  const { currentProject, projects, isLoading } = useProject();
  const {
    isOpen,
    setIsOpen,
    newProjectName,
    setNewProjectName,
    newProjectDescription,
    setNewProjectDescription,
    handleCreateProject,
  } = useProjectCreation();

  const handleProjectChange = (projectId: string) => {
    const selectedProject = projects.find(p => p.id === projectId);
    setCurrentProject(selectedProject || null);
  };

  return (
    <div className="flex items-center gap-4">
      <ProjectSelect
        isLoading={isLoading}
        currentProject={currentProject}
        projects={projects}
        handleProjectChange={handleProjectChange}
      />
      <ProjectDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        newProjectName={newProjectName}
        setNewProjectName={setNewProjectName}
        newProjectDescription={newProjectDescription}
        setNewProjectDescription={setNewProjectDescription}
        handleCreateProject={handleCreateProject}
      />
    </div>
  );
};

