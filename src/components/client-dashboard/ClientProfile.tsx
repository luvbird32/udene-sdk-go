import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { User, UserRound, Building2, BadgeCheck, Phone, Globe, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Profile } from "@/types/supabase";

export const ClientProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    organization_name: "",
    organization_role: "",
    phone_number: "",
    timezone: "",
    preferences: {
      notifications: {
        email: true,
        sms: false
      },
      theme: "light"
    }
  });

  const { data: profile, refetch } = useQuery({
    queryKey: ["client-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      
      setFormData({
        username: data.username || "",
        organization_name: data.organization_name || "",
        organization_role: data.organization_role || "",
        phone_number: data.phone_number || "",
        timezone: data.timezone || "UTC",
        preferences: data.preferences || {
          notifications: { email: true, sms: false },
          theme: "light"
        }
      });
      
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .update({
          username: formData.username,
          organization_name: formData.organization_name,
          organization_role: formData.organization_role,
          phone_number: formData.phone_number,
          timezone: formData.timezone,
          preferences: formData.preferences,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      await refetch();
      setIsEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!profile) return null;

  const timezones = [
    "UTC", "America/New_York", "America/Los_Angeles", "Europe/London", 
    "Europe/Paris", "Asia/Tokyo", "Asia/Singapore", "Australia/Sydney"
  ];

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserRound className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Profile Information</h2>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization_name">Organization Name</Label>
            <Input
              id="organization_name"
              value={formData.organization_name}
              onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
              placeholder="Enter your organization name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization_role">Role in Organization</Label>
            <Input
              id="organization_role"
              value={formData.organization_role}
              onChange={(e) => setFormData({ ...formData, organization_role: e.target.value })}
              placeholder="Enter your role"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              placeholder="Enter your phone number"
              type="tel"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={formData.timezone}
              onValueChange={(value) => setFormData({ ...formData, timezone: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Notification Preferences</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Email Notifications
                </Label>
                <Switch
                  id="email-notifications"
                  checked={formData.preferences.notifications.email}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      notifications: {
                        ...formData.preferences.notifications,
                        email: checked
                      }
                    }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  SMS Notifications
                </Label>
                <Switch
                  id="sms-notifications"
                  checked={formData.preferences.notifications.sms}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      notifications: {
                        ...formData.preferences.notifications,
                        sms: checked
                      }
                    }
                  })}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      ) : (
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
      )}
    </Card>
  );
};