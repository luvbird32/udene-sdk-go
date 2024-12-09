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

const Users = () => {
  const [selectedTab, setSelectedTab] = useState("users");
  const { users, isLoading, updateUser } = useUsers();

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