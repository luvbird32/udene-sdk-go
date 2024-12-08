import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Shield, Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { UserTable } from "@/components/users/UserTable";
import { ActivityLog } from "@/components/users/ActivityLog";
import { Link } from "react-router-dom";
import { User } from "@/types/users";
import { supabase } from "@/integrations/supabase/client";
import { AddUserDialog } from "@/components/users/AddUserDialog";

const Users = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("users");
  const queryClient = useQueryClient();

  // Get current user's profile
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

      console.log("Fetched profiles:", profiles);

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

      // First, validate the role if it's being updated
      if (data.role && !["admin", "user", "analyst"].includes(data.role)) {
        throw new Error("Invalid role specified");
      }

      // Then validate the status if it's being updated
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

      // Log the user activity with the correct profile_id
      const { error: activityError } = await supabase
        .from("user_activities")
        .insert({
          profile_id: currentUser.id, // Using the authenticated user's ID
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

  const handleRoleChange = async (userId: string, newRole: User["role"]) => {
    try {
      await updateUserMutation.mutateAsync({
        userId,
        data: { role: newRole },
      });
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleStatusToggle = async (userId: string, newStatus: User["status"]) => {
    try {
      await updateUserMutation.mutateAsync({
        userId,
        data: { status: newStatus },
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">User Administration</h1>
        </div>
        <AddUserDialog />
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="users" className="space-x-2">
            <Shield className="h-4 w-4" />
            <span>Users & Roles</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="space-x-2">
            <Activity className="h-4 w-4" />
            <span>Activity Log</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="p-6">
            <UserTable 
              users={users}
              onRoleChange={handleRoleChange}
              onStatusToggle={handleStatusToggle}
            />
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <ActivityLog users={users} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;