import { User } from "@/types/users";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserActions } from "./UserActions";

interface UserTableRowProps {
  user: User;
  onRoleChange: (userId: string, newRole: User["role"]) => Promise<void>;
  onStatusToggle: (userId: string, newStatus: User["status"]) => Promise<void>;
}

export const UserTableRow = ({ user, onRoleChange, onStatusToggle }: UserTableRowProps) => {
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Badge variant={user.role === "admin" ? "destructive" : "default"}>
          {user.role}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={user.status === "active" ? "default" : "secondary"}>
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>
        {new Date(user.lastActive).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <UserActions 
          user={user}
          onRoleChange={onRoleChange}
          onStatusToggle={onStatusToggle}
        />
      </TableCell>
    </TableRow>
  );
};