import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "./types";

interface ActivityLogProps {
  users: User[];
}

export const ActivityLog = ({ users }: ActivityLogProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between border-b border-white/10 pb-4"
          >
            <div>
              <p className="font-medium text-white/90">{user.name}</p>
              <p className="text-sm text-white/70">
                Last active: {new Date(user.lastActive).toLocaleString()}
              </p>
            </div>
            <Badge variant="outline" className="glass-button">
              {user.role}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};