import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { UserActions } from "./UserActions";
import { Profile } from "@/types/supabase";

export const UserManagement = () => {
  const { data: users, isLoading, error } = useQuery({
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

      return profiles?.map((profile): Profile => ({
        id: profile.id,
        username: profile.username || "Unnamed User",
        status: profile.status || "active",
        // Ensure we have default values for required fields
        role: profile.role || "user",
        account_type: profile.account_type || "personal",
        created_at: profile.created_at,
        updated_at: profile.updated_at
      })) || [];
    },
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">User Management</h3>
        <div>Loading users...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">User Management</h3>
        <div className="text-red-500">Error loading users: {error.message}</div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">User Management</h3>
      <div className="space-y-4">
        {users?.map((user) => (
          <div key={user.id} className="flex justify-between items-center">
            <span>{user.username || user.id}</span>
            <UserActions 
              user={user}
              onStatusToggle={async (userId, newStatus) => {
                await supabase.from('profiles').update({ status: newStatus }).eq('id', userId);
              }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};