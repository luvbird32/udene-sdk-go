import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types/database";
import { useEffect, useState } from "react";

type ClientService = Database['public']['Tables']['client_services']['Row'];

export const useServices = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  // Get and track the current user's ID
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return useQuery({
    queryKey: ["client-services", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      try {
        const { data: services, error } = await supabase
          .from('client_services')
          .select('*')
          .eq('user_id', userId);

        if (error) {
          console.error('Supabase error:', error);
          toast({
            title: "Error loading services",
            description: error.message,
            variant: "destructive"
          });
          throw error;
        }

        // Transform the services to include project_id if missing
        const transformedServices = services.map(service => ({
          ...service,
          project_id: service.project_id || null
        }));

        return transformedServices as ClientService[];
      } catch (error) {
        console.error('Error fetching services:', error);
        toast({
          title: "Connection Error",
          description: "Failed to load services. Please check your connection and try again.",
          variant: "destructive"
        });
        throw error;
      }
    },
    enabled: !!userId,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};