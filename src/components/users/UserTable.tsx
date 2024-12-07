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
import { User } from "./types";

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: User["role"]) => Promise<void>;
  onStatusToggle: (userId: string, newStatus: User["status"]) => Promise<void>;
}

export const UserTable = ({ users, onRoleChange, onStatusToggle }: UserTableProps) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-black/40">
          <TableRow className="hover:bg-black/40 border-b border-white/10">
            <TableHead className="text-white/70">Name</TableHead>
            <TableHead className="text-white/70">Email</TableHead>
            <TableHead className="text-white/70">Role</TableHead>
            <TableHead className="text-white/70">Status</TableHead>
            <TableHead className="text-white/70">Last Active</TableHead>
            <TableHead className="text-white/70">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-white/5 border-b border-white/10">
              <TableCell className="text-white/90">{user.name}</TableCell>
              <TableCell className="text-white/90">{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={user.role === "admin" ? "destructive" : "default"}
                  className="glass-button"
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.status === "active" ? "default" : "secondary"}
                  className="glass-button"
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-white/90">
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
    </div>
  );
};