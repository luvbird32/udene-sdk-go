import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/users";

interface UserActionsProps {
  user: User;
  onRoleChange: (userId: string, newRole: User["role"]) => Promise<void>;
  onStatusToggle: (userId: string, newStatus: User["status"]) => Promise<void>;
}

export const UserActions = ({ user, onRoleChange, onStatusToggle }: UserActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onRoleChange(user.id, "admin")}>
          Make Admin
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRoleChange(user.id, "analyst")}>
          Make Analyst
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRoleChange(user.id, "user")}>
          Make User
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            onStatusToggle(user.id, user.status === "active" ? "inactive" : "active")
          }
        >
          {user.status === "active" ? "Deactivate User" : "Activate User"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};