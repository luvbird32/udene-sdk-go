import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { UserRound } from "lucide-react";
import { Profile } from "@/types/supabase";
import { ProfileForm } from "./profile/ProfileForm";
import { ProfileDisplay } from "./profile/ProfileDisplay";
import { ProfileFormData, ProfilePreferences } from "@/types/profile";

export const ClientProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
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
      
      // First cast to unknown, then to ProfilePreferences to ensure type safety
      const rawPreferences = data.preferences as unknown;
      const preferences: ProfilePreferences = (rawPreferences as ProfilePreferences) || {
        notifications: { email: true, sms: false },
        theme: "light"
      };
      
      setFormData({
        username: data.username || "",
        organization_name: data.organization_name || "",
        organization_role: data.organization_role || "",
        phone_number: data.phone_number || "",
        timezone: data.timezone || "UTC",
        preferences
      });
      
      return { ...data, preferences };
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
          preferences: formData.preferences as any,
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
        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProfileDisplay profile={profile as Profile & { preferences: ProfilePreferences }} />
      )}
    </Card>
  );
};