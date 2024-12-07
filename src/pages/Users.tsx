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
        <Button>Add User</Button>
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