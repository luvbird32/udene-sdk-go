import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/users";
import { useToast } from "@/components/ui/use-toast";

export const useUsers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");
      return user;
    },
  });

  const { data: users = [], isLoading } = useQuery({
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

  const updateUserMutation = useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: Partial<User>;
    }) => {
      console.log("Updating user in Supabase:", userId, data);
      
      if (!currentUser?.id) {
        throw new Error("No authenticated user found");
      }

      if (data.role && !["admin", "user", "analyst"].includes(data.role)) {
        throw new Error("Invalid role specified");
      }

      if (data.status && !["active", "inactive"].includes(data.status)) {
        throw new Error("Invalid status specified");
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          role: data.role,
          status: data.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating user:", updateError);
        throw updateError;
      }

      const { error: activityError } = await supabase
        .from("user_activities")
        .insert({
          profile_id: currentUser.id,
          activity_type: "user_update",
          description: `Updated user ${userId}: ${Object.keys(data).join(", ")}`,
          metadata: data
        });

      if (activityError) {
        console.error("Error logging activity:", activityError);
        throw activityError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    users,
    isLoading,
    currentUser,
    updateUser: updateUserMutation.mutateAsync,
  };
};