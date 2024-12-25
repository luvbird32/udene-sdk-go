import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileFormData } from "@/types/profile";

/**
 * @component BasicInfoFields
 * @description Form fields for basic user information including username, organization details, and role.
 * 
 * @example
 * ```tsx
 * <BasicInfoFields
 *   formData={profileData}
 *   setFormData={handleFormDataChange}
 * />
 * ```
 */
interface BasicInfoFieldsProps {
  /** Current form data */
  formData: ProfileFormData;
  /** Function to update form data */
  setFormData: (data: ProfileFormData) => void;
}

export const BasicInfoFields = ({ formData, setFormData }: BasicInfoFieldsProps) => {
  return (
    <>
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
    </>
  );
};