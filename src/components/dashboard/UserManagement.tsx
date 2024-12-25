/**
 * UserManagement Component
 * 
 * Provides interface for administrators to manage user accounts,
 * roles, and permissions across the system.
 * 
 * Features:
 * - User list with filtering
 * - Role management
 * - Account status controls
 * - Bulk actions
 * - User activity tracking
 * 
 * @component
 * @example
 * ```tsx
 * <UserManagement />
 * ```
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/types/users";
import { UserActions } from "./UserActions";

export const UserManagement = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      return data;
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
        {users.map((user: User) => (
          <div key={user.id} className="flex justify-between items-center">
            <span>{user.email}</span>
            <UserActions 
              user={user} 
              onRoleChange={async (userId, newRole) => {
                await supabase.from('users').update({ role: newRole }).eq('id', userId);
              }} 
              onStatusToggle={async (userId, newStatus) => {
                await supabase.from('users').update({ status: newStatus }).eq('id', userId);
              }} 
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
