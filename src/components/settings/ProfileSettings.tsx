import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface ProfileData {
  name: string;
  email: string;
  avatar: string;
}

interface ProfileSettingsProps {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
}

export const ProfileSettings = ({ profile, setProfile }: ProfileSettingsProps) => {
  const { toast } = useToast();

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
  };

  return (
    <form onSubmit={handleProfileUpdate} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
      </div>

      <Button type="submit">Update Profile</Button>
    </form>
  );
};