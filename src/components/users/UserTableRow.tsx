import { User } from "@/types/users";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserActions } from "./UserActions";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

interface UserTableRowProps {
  user: User;
  onRoleChange: (userId: string, newRole: User["role"]) => Promise<void>;
  onStatusToggle: (userId: string, newStatus: User["status"]) => Promise<void>;
}

export const UserTableRow = ({ user, onRoleChange, onStatusToggle }: UserTableRowProps) => {
  const getStatusIcon = () => {
    switch (user.status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "blocked":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "suspended":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "investigating":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = () => {
    switch (user.status) {
      case "active":
        return "success";
      case "blocked":
        return "destructive";
      case "suspended":
        return "warning";
      case "investigating":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <TableRow className="border-b border-green-500/20">
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Badge variant={user.role === "admin" ? "destructive" : "default"}>
          {user.role}
        </Badge>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant={getStatusBadgeVariant()} className="flex items-center gap-1">
                {getStatusIcon()}
                {user.status}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Last status change: {new Date(user.lastStatusChange || user.lastActive).toLocaleString()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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