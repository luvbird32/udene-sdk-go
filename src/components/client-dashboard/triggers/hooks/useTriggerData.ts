import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTriggerData = () => {
  return useQuery({
    queryKey: ['triggers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_triggers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};