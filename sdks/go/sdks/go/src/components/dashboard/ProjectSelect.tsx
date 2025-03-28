
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
      <SelectTrigger className="w-[200px] bg-secondary text-secondary-foreground border-input">
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent className="bg-secondary text-secondary-foreground border border-border shadow-lg z-50">
        <SelectItem 
          value="all" 
          className="hover:bg-muted/50 hover:text-foreground focus:bg-muted/50 focus:text-foreground"
        >
          All Projects
        </SelectItem>
        {projects?.map((project) => (
          <SelectItem 
            key={project.id} 
            value={project.id}
            className="hover:bg-muted/50 hover:text-foreground focus:bg-muted/50 focus:text-foreground"
          >
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
