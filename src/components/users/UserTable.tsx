import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/users";
import { UserTableRow } from "./UserTableRow";

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: User["role"]) => Promise<void>;
  onStatusToggle: (userId: string, newStatus: User["status"]) => Promise<void>;
}

export const UserTable = ({ users, onRoleChange, onStatusToggle }: UserTableProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No users found
      </div>
    );
  }

  return (
    <div className="rounded-md border border-green-500/20 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-green-500/20">
            <TableHead className="text-green-400">Name</TableHead>
            <TableHead className="text-green-400">Email</TableHead>
            <TableHead className="text-green-400">Role</TableHead>
            <TableHead className="text-green-400">Status</TableHead>
            <TableHead className="text-green-400">Last Active</TableHead>
            <TableHead className="text-green-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onRoleChange={onRoleChange}
              onStatusToggle={onStatusToggle}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};