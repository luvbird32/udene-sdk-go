import { Shield } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserActions } from "./UserActions";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/users";

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: User["role"]) => Promise<void>;
  onStatusToggle: (userId: string, newStatus: User["status"]) => Promise<void>;
}

export const UserTable = ({ users, onRoleChange, onStatusToggle }: UserTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge
                variant={user.role === "admin" ? "destructive" : "default"}
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={user.status === "active" ? "default" : "secondary"}
              >
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
        ))}
      </TableBody>
    </Table>
  );
};