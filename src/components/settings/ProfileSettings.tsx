import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "lucide-react";
import { ProfileFormData, ProfileSettingsProps } from "./types";
import { ProfileSettingsForm } from "./ProfileSettingsForm";

export const ProfileSettings = ({ className }: ProfileSettingsProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as ProfileFormData;
    },
  });

  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    avatar_url: '',
    account_type: 'personal',
    organization_name: '',
    organization_role: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          avatar_url: formData.avatar_url,
          account_type: formData.account_type,
          organization_name: formData.organization_name,
          organization_role: formData.organization_role,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      await queryClient.invalidateQueries({ queryKey: ["user-profile"] });

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      // Log the profile update activity
      await supabase.from('user_activities').insert({
        profile_id: user.id,
        activity_type: 'profile_update',
        description: 'Updated profile information',
      });

    } catch (err: any) {
      console.error('Profile update error:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleProfileUpdate} className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Profile Information</h2>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <ProfileSettingsForm 
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
      />
    </form>
  );
};