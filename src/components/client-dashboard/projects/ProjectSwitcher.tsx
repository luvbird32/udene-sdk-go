import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProjectForm } from "./ProjectForm";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export function ProjectSwitcher() {
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const { currentProject, currentProjectId, setCurrentProjectId } = useCurrentProject();
  const { data: user } = useCurrentUser();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!user) return [];
      
      console.log("Fetching projects from Supabase...");
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
        throw error;
      }

      console.log("Projects fetched:", data);
      return data;
    },
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" className="w-[200px] justify-start">
          Loading projects...
        </Button>
        <Button variant="outline" size="icon" disabled>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {currentProject
              ? projects?.find((project) => project.id === currentProjectId)?.name
              : "Select project..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search projects..." />
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projects?.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.id}
                  onSelect={() => {
                    setCurrentProjectId(project.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentProjectId === project.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {project.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <ProjectForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}