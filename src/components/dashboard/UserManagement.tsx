import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { UserTable } from "@/components/users/UserTable";
import { useUsers } from "@/hooks/useUsers";

export const UserManagement = () => {
  const { users, isLoading, updateUser } = useUsers();

  const handleRoleChange = async (userId: string, newRole: "admin" | "user" | "analyst") => {
    await updateUser({
      userId,
      data: { role: newRole },
    });
  };

  const handleStatusToggle = async (userId: string, newStatus: "active" | "inactive") => {
    await updateUser({
      userId,
      data: { status: newStatus },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <Card className="p-6 bg-black/50 border-green-500/20">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-green-400">Registered Users</h2>
        </div>
        <UserTable
          users={users}
          onRoleChange={handleRoleChange}
          onStatusToggle={handleStatusToggle}
        />
      </div>
    </Card>
  );
};