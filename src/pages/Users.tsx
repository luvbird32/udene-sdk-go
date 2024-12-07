import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Shield, Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { UserTable } from "@/components/users/UserTable";
import { ActivityLog } from "@/components/users/ActivityLog";
import { Link } from "react-router-dom";
import { User } from "@/components/users/types";

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    lastActive: "2024-02-20T10:00:00",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "analyst",
    lastActive: "2024-02-19T15:30:00",
    status: "active",
  },
];

const Users = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("users");

  const { data: users = mockUsers, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // In a real app, this would fetch from your API
      return mockUsers;
    },
  });

  const handleRoleChange = async (userId: string, newRole: User["role"]) => {
    try {
      toast({
        title: "Role Updated",
        description: `User role has been updated to ${newRole}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (userId: string, newStatus: User["status"]) => {
    try {
      toast({
        title: "Status Updated",
        description: `User status has been updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
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
          <Button className="glass-button">Add User</Button>
        </div>

        <Card className="glass-card p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList className="glass-nav bg-black/20 border-none">
              <TabsTrigger value="users" className="data-[state=active]:bg-white/10">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Users & Roles</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-white/10">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span>Activity Log</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="glass-card mt-4">
              <UserTable 
                users={users}
                onRoleChange={handleRoleChange}
                onStatusToggle={handleStatusToggle}
              />
            </TabsContent>

            <TabsContent value="activity">
              <ActivityLog users={users} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Users;