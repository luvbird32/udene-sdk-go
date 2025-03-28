import { createContext, useContext, useState } from 'react';
import { ProfileFormData } from '@/types/profile';

interface ProfileContextType {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <ProfileContext.Provider value={{ formData, setFormData, isEditing, setIsEditing }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};