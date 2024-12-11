import { MoreVertical, Key, Ban, Shield, AlertTriangle, UserX, ArrowUpCircle, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/users";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserActionsProps {
  user: User;
  onRoleChange: (userId: string, newRole: User["role"]) => Promise<void>;
  onStatusToggle: (userId: string, newStatus: User["status"]) => Promise<void>;
}

export const UserActions = ({ user, onRoleChange, onStatusToggle }: UserActionsProps) => {
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const { toast } = useToast();

  const handlePasswordReset = async () => {
    try {
      // Instead of directly updating the password, we'll trigger a password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(user.email || '', {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password reset email has been sent to the user",
      });
      setIsResetPasswordOpen(false);
    } catch (error) {
      console.error("Error initiating password reset:", error);
      toast({
        title: "Error",
        description: "Failed to initiate password reset",
        variant: "destructive",
      });
    }
  };

  const handleTerminateAccount = async () => {
    try {
      // Instead of directly deleting the user, we'll set their status to terminated
      await onStatusToggle(user.id, "inactive");
      
      toast({
        title: "Success",
        description: "Account has been deactivated",
      });
    } catch (error) {
      console.error("Error terminating account:", error);
      toast({
        title: "Error",
        description: "Failed to terminate account",
        variant: "destructive",
      });
    }
  };

  const handleSuspendAccount = async () => {
    try {
      await onStatusToggle(user.id, "suspended");
      toast({
        title: "Success",
        description: "Account has been suspended",
      });
    } catch (error) {
      console.error("Error suspending account:", error);
      toast({
        title: "Error",
        description: "Failed to suspend account",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsResetPasswordOpen(true)}>
            <Key className="mr-2 h-4 w-4" />
            Reset Password
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => onRoleChange(user.id, "admin")}>
            <Shield className="mr-2 h-4 w-4" />
            Make Admin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRoleChange(user.id, "analyst")}>
            <Shield className="mr-2 h-4 w-4" />
            Make Analyst
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRoleChange(user.id, "user")}>
            <Shield className="mr-2 h-4 w-4" />
            Make User
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => onStatusToggle(user.id, user.status === "active" ? "blocked" : "active")}>
            <Ban className="mr-2 h-4 w-4" />
            {user.status === "active" ? "Block User" : "Unblock User"}
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleSuspendAccount}>
            <PauseCircle className="mr-2 h-4 w-4" />
            Suspend Account
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => onStatusToggle(user.id, "investigating")}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Mark for Investigation
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => onRoleChange(user.id, "premium")}>
            <ArrowUpCircle className="mr-2 h-4 w-4" />
            Upgrade to Premium
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleTerminateAccount}
            className="text-red-600 focus:text-red-600"
          >
            <UserX className="mr-2 h-4 w-4" />
            Terminate Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset User Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This will send a password reset email to the user's email address.
            </p>
            <Button 
              onClick={handlePasswordReset}
              className="w-full glass-button text-green-400 hover:text-green-300"
            >
              Send Reset Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};