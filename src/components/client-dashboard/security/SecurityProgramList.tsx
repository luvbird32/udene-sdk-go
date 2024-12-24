import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SecurityProgramCard } from "./SecurityProgramCard";
import { OpenSourceSecurity } from "./OpenSourceSecurity";
import { VulnerabilityScanning } from "./VulnerabilityScanning";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { SecurityProgram } from "@/integrations/supabase/types/security";
import { useToast } from "@/hooks/use-toast";

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
    return (
      <Card className="p-6 flex justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <OpenSourceSecurity />
      <VulnerabilityScanning />
      
      <div className="space-y-4">
        {programs?.map((program) => (
          <SecurityProgramCard key={program.id} program={program} />
        ))}
        {(!programs || programs.length === 0) && (
          <Card className="p-6 text-center text-muted-foreground">
            No security programs found.
          </Card>
        )}
      </div>
    </div>
  );
};