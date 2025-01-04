import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProfileProvider } from "./profile/ProfileContext";
import { ProfileHeader } from "./profile/ProfileHeader";
import { ProfileForm } from "./profile/ProfileForm";
import { ProfileDisplay } from "./profile/ProfileDisplay";
import { useProfile } from "./profile/ProfileContext";
import { useProfileData } from "./profile/useProfileData";

const ProfileContent = () => {
  const { toast } = useToast();
  const { isEditing, formData, setFormData, setIsEditing } = useProfile();
  const { data: profile, refetch, isLoading, error } = useProfileData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      console.log("Updating profile for user:", user.id, "with data:", formData);

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
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-destructive">
          Failed to load profile. Please try again later.
        </div>
      </Card>
    );
  }

  if (!profile) return null;

  return (
    <Card className="p-6 space-y-6">
      <ProfileHeader />
      {isEditing ? (
        <ProfileForm 
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProfileDisplay profile={profile} />
      )}
    </Card>
  );
};

export const ClientProfile = () => {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  );
};