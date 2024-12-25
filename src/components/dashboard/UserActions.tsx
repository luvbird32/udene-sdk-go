import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/types/users";

interface UserActionsProps {
  user: User;
  onRoleChange: (userId: string, newRole: string) => Promise<void>;
  onStatusToggle: (userId: string, newStatus: string) => Promise<void>;
}

export const UserActions = ({ user, onRoleChange, onStatusToggle }: UserActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}>
          {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusToggle(user.id, user.status === 'active' ? 'inactive' : 'active')}>
          {user.status === 'active' ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};