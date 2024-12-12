import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SecurityProgramCard } from "./SecurityProgramCard";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const SecurityProgramList = () => {
  const { data: programs, isLoading } = useQuery({
    queryKey: ["security-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_security_programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
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
  );
};