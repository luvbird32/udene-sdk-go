import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SecurityProgramCard } from "./SecurityProgramCard";
import { OpenSourceSecurity } from "./OpenSourceSecurity";
import { VulnerabilityScanning } from "./VulnerabilityScanning";
import { DependencyMonitor } from "./components/dependency/DependencyMonitor";
import { SecurityProgram } from "@/integrations/supabase/types/security";
import { useToast } from "@/hooks/use-toast";
import { LoadingProgram } from "./components/LoadingProgram";
import { EmptyProgramState } from "./components/EmptyProgramState";

export const SecurityProgramList = () => {
  const { toast } = useToast();
  
  const { data: programs, isLoading } = useQuery({
    queryKey: ["security-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_security_programs')
        .select(`
          *,
          security_assessments (
            id,
            assessment_type,
            status,
            findings,
            risk_level,
            due_date
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching security programs:", error);
        toast({
          title: "Error",
          description: "Failed to fetch security programs. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      return data as SecurityProgram[];
    },
  });

  if (isLoading) {
    return <LoadingProgram />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OpenSourceSecurity />
        <VulnerabilityScanning />
      </div>
      
      <DependencyMonitor />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Security Programs</h2>
        <div className="grid gap-6">
          {programs?.map((program) => (
            <SecurityProgramCard key={program.id} program={program} />
          ))}
          {(!programs || programs.length === 0) && <EmptyProgramState />}
        </div>
      </div>
    </div>
  );
};