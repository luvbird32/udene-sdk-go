import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, User } from "lucide-react";

interface ProfileFormData {
  username: string | null;
  avatar_url: string | null;
  account_type: string;
  organization_name: string | null;
  organization_role: string | null;
}

export const ProfileSettings = () => {
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
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
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

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={formData.username || ''}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Enter your username"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatar_url">Avatar URL</Label>
        <Input
          id="avatar_url"
          value={formData.avatar_url || ''}
          onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
          placeholder="Enter your avatar URL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="account_type">Account Type</Label>
        <Select
          value={formData.account_type}
          onValueChange={(value) => setFormData({ ...formData, account_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.account_type !== 'personal' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="organization_name">Organization Name</Label>
            <Input
              id="organization_name"
              value={formData.organization_name || ''}
              onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
              placeholder="Enter your organization name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization_role">Your Role</Label>
            <Input
              id="organization_role"
              value={formData.organization_role || ''}
              onChange={(e) => setFormData({ ...formData, organization_role: e.target.value })}
              placeholder="Enter your role in the organization"
            />
          </div>
        </>
      )}

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          'Update Profile'
        )}
      </Button>
    </form>
  );
};