import { Card } from "@/components/ui/card";
import { UserTable } from "@/components/users/UserTable";
import { MonitoringDashboard } from "@/components/monitoring/MonitoringDashboard";
import { ErrorLog } from "@/components/monitoring/ErrorLog";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { AutomatedResponse } from "@/components/monitoring/AutomatedResponse";
import { AuditLogger } from "@/components/monitoring/AuditLogger";
import { useUsers } from "@/hooks/useUsers";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Users = () => {
  const { users, isLoading, updateUser } = useUsers();
  const { toast } = useToast();

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">User Management & System Monitoring</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <HealthStatus />
        <ErrorLog />
      </div>

      <Card className="p-6">
        <UserTable 
          users={users || []}
          onRoleChange={handleRoleChange}
          onStatusToggle={handleStatusToggle}
        />
      </Card>

      <MonitoringDashboard />
      
      {/* Background monitoring components */}
      <AutomatedResponse />
      <AuditLogger />
    </div>
  );
};

export default Users;