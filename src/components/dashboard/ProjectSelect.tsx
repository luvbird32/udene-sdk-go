
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
      <SelectTrigger className="w-[200px] bg-background border-input">
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent className="bg-popover border border-border shadow-md">
        <SelectItem value="all" className="hover:bg-accent hover:text-accent-foreground">
          All Projects
        </SelectItem>
        {projects?.map((project) => (
          <SelectItem 
            key={project.id} 
            value={project.id}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
