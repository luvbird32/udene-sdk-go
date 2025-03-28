import { ProfileFormData } from "@/types/profile";
import { NotificationPreferences } from "./NotificationPreferences";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { ContactFields } from "./form/ContactFields";
import { FormActions } from "./form/FormActions";

interface ProfileFormProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

export const ProfileForm = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  setIsEditing 
}: ProfileFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <BasicInfoFields formData={formData} setFormData={setFormData} />
      <ContactFields formData={formData} setFormData={setFormData} />
      <NotificationPreferences formData={formData} setFormData={setFormData} />
      <FormActions setIsEditing={setIsEditing} />
    </form>
  );
};