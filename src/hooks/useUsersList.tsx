import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/users";

export const useUsersList = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      console.log("Fetching users from Supabase...");
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
        throw error;
      }

      return profiles.map((profile): User => ({
        id: profile.id,
        name: profile.username || "Unnamed User",
        email: null,
        role: profile.role as User["role"],
        lastActive: profile.updated_at || profile.created_at,
        status: profile.status as User["status"],
      }));
    },
  });
};