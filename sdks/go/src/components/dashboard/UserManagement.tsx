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
        avatar_url: profile.avatar_url || null,
        created_at: profile.created_at || new Date().toISOString(),
        updated_at: profile.updated_at || new Date().toISOString(),
        role: profile.role || "user",
        account_type: profile.account_type || "personal",
        organization_id: profile.organization_id || null,
        organization_name: profile.organization_name || null,
        organization_role: profile.organization_role || null,
        status: profile.status || "active",
        settings: profile.settings || {},
        phone_number: profile.phone_number || null,
        timezone: profile.timezone || "UTC",
        email_verified: profile.email_verified || false,
        last_login: profile.last_login || null,
        preferences: profile.preferences || {
          theme: "light",
          notifications: { email: true, sms: false }
        },
        security_settings: profile.security_settings || {},
        mfa_enabled: profile.mfa_enabled || false,
        mfa_secret: profile.mfa_secret || null,
        backup_codes: profile.backup_codes || [],
        session_timeout_minutes: profile.session_timeout_minutes || 30
      })) || [];
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">User Management</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold mb-4">User Management</h3>
        <div className="text-red-500">Error loading users: {(error as Error).message}</div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">User Management</h3>
      <div className="space-y-4">
        {users?.map((user) => (
          <div key={user.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-col">
              <span className="font-medium">{user.username}</span>
              <span className="text-sm text-gray-500">Role: {user.role}</span>
            </div>
            <UserActions 
              user={user}
              onStatusToggle={async (userId, newStatus) => {
                await supabase
                  .from('profiles')
                  .update({ status: newStatus })
                  .eq('id', userId);
              }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};