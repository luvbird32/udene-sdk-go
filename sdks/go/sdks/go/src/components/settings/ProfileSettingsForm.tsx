import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ProfileFormData } from "./types";

interface ProfileSettingsFormProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
  isLoading: boolean;
}

export const ProfileSettingsForm = ({ formData, setFormData, isLoading }: ProfileSettingsFormProps) => {
  return (
    <>
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
    </>
  );
};