import { Card } from "@/components/ui/card";
import { Button } from "@/components/shared/ui/Button";
import { UserTable } from "@/components/users/UserTable";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/states/LoadingSpinner";

const Users = () => {
  const { users, isLoading, error, updateUser } = useAdminUsers();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      toast({
        title: "Success",
        description: "User role updated successfully",
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (userId: string, newStatus: string) => {
    try {
      await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', userId);

      toast({
        title: "Success",
        description: "User status updated successfully",
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <div className="text-red-500">Error loading users: {error.message}</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
      </div>
      <Card className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <LoadingSpinner />
          </div>
        ) : (
          <UserTable 
            users={users || []}
            onRoleChange={handleRoleChange}
            onStatusToggle={handleStatusToggle}
          />
        )}
      </Card>
    </div>
  );
};

export default Users;