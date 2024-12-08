import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/users";

interface ActivityLogProps {
  users: User[];
}

export const ActivityLog = ({ users }: ActivityLogProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">
                Last active: {new Date(user.lastActive).toLocaleString()}
              </p>
            </div>
            <Badge variant="outline">{user.role}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};