import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { UserActions } from "./UserActions";
import { Profile } from "@/types/supabase";

export const UserManagement = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      return data as Profile[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">User Management</h3>
      <div className="space-y-4">
        {users.map((user) => (
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