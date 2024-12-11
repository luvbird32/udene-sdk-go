import { User, Building2, BadgeCheck, Phone, Globe, Bell } from "lucide-react";
import { Profile } from "@/types/supabase";
import { ProfilePreferences } from "@/types/profile";

interface ProfileDisplayProps {
  profile: Profile & { preferences: ProfilePreferences };
}

export const ProfileDisplay = ({ profile }: ProfileDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Username:</span>
        <span className="font-medium">{profile.username || "Not set"}</span>
      </div>

      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Organization:</span>
        <span className="font-medium">{profile.organization_name || "Not set"}</span>
      </div>

      <div className="flex items-center gap-2">
        <BadgeCheck className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Role:</span>
        <span className="font-medium">{profile.organization_role || "Not set"}</span>
      </div>

      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Phone:</span>
        <span className="font-medium">{profile.phone_number || "Not set"}</span>
      </div>

      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Timezone:</span>
        <span className="font-medium">{profile.timezone || "UTC"}</span>
      </div>

      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Notifications:</span>
        <span className="font-medium">
          {profile.preferences?.notifications?.email ? "Email" : ""}{" "}
          {profile.preferences?.notifications?.sms ? "SMS" : ""}
          {(!profile.preferences?.notifications?.email && !profile.preferences?.notifications?.sms) ? "None" : ""}
        </span>
      </div>
    </div>
  );
};