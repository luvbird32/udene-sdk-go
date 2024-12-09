import { useState } from "react";
import { Shield, Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable } from "@/components/users/UserTable";
import { ActivityLog } from "@/components/users/ActivityLog";
import { Link } from "react-router-dom";
import { AddUserDialog } from "@/components/users/AddUserDialog";
import { useUsers } from "@/hooks/useUsers";
import { User } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Users = () => {
  const [selectedTab, setSelectedTab] = useState("users");
  const { users, isLoading, updateUser } = useUsers();

  const { data: activities = [] } = useQuery({
    queryKey: ["user-activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data;
    }
  });

  const handleRoleChange = async (userId: string, newRole: User["role"]) => {
    await updateUser({
      userId,
      data: { role: newRole },
    });
  };

  const handleStatusToggle = async (userId: string, newStatus: User["status"]) => {
    await updateUser({
      userId,
      data: { status: newStatus },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto p-6">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-pulse-slow">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-primary/50 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-4 border-4 border-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          {activities.map((activity, i) => (
            <div
              key={activity.id}
              className="absolute animate-fall"
              style={{
                left: `${(i / activities.length) * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.25
              }}
            >
              {activity.activity_type.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8 relative z-10">
        <div className="flex justify-between items-center mb-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="icon" className="glass-button">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              User Administration
            </h1>
          </div>
          <AddUserDialog />
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="animate-fade-in">
          <TabsList className="glass-card mb-6 p-1">
            <TabsTrigger value="users" className="data-[state=active]:glass-button space-x-2">
              <Shield className="h-4 w-4" />
              <span>Users & Roles</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:glass-button space-x-2">
              <Activity className="h-4 w-4" />
              <span>Activity Log</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="animate-fade-in">
            <Card className="glass-card border-0">
              <div className="p-6">
                <UserTable 
                  users={users}
                  onRoleChange={handleRoleChange}
                  onStatusToggle={handleStatusToggle}
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="animate-fade-in">
            <ActivityLog users={users} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Users;