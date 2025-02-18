
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: string;
  name: string;
  description?: string | null;
}

interface ProjectSelectProps {
  isLoading: boolean;
  currentProject: Project | null;
  projects: Project[];
  handleProjectChange: (projectId: string) => void;
}

export const ProjectSelect = ({
  isLoading,
  currentProject,
  projects,
  handleProjectChange
}: ProjectSelectProps) => {
  return (
    <Select 
      disabled={isLoading} 
      value={currentProject?.id} 
      onValueChange={handleProjectChange}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Projects</SelectItem>
        {projects?.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
