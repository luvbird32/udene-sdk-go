import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { InvestigationLogInsert } from "@/integrations/supabase/types/investigation";

interface UseInvestigationFormProps {
  onSuccess: () => void;
}

export const useInvestigationForm = ({ onSuccess }: UseInvestigationFormProps) => {
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) {
      setErrors("Please select an investigation type");
      toast({
        title: "Error",
        description: "Please select an investigation type",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: services, error: servicesError } = await supabase
        .from('client_services')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (servicesError) throw servicesError;
      if (!services) throw new Error("No active service found");

      const newLog: InvestigationLogInsert = {
        user_id: user.id,
        service_id: services.id,
        investigation_type: type,
        notes,
        status: 'pending',
        findings: {},
        sanitization_steps: [],
        manual_actions: []
      };

      const { error } = await supabase
        .from('service_investigation_logs')
        .insert(newLog);

      if (error) throw error;

      toast({
        title: "Investigation Created",
        description: "New investigation log has been created successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["investigation-logs"] });
      onSuccess();
      setType("");
      setNotes("");
      setErrors(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create investigation";
      setErrors(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    type,
    setType,
    notes,
    setNotes,
    isSubmitting,
    handleSubmit,
    errors,
  };
};