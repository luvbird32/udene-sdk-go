import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Profile } from "@/types/supabase";
import { MoreHorizontal } from "lucide-react";

interface UserActionsProps {
  user: Profile;
  onStatusToggle: (userId: string, newStatus: string) => Promise<void>;
}

export const UserActions = ({ user, onStatusToggle }: UserActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={async () => {
            try {
              await onStatusToggle(user.id, user.status === "active" ? "suspended" : "active");
            } catch (error) {
              console.error("Error toggling user status:", error);
            }
          }}
        >
          {user.status === "active" ? "Suspend User" : "Activate User"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};