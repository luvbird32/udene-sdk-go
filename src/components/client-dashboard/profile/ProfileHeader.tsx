/**
 * ProfileHeader Component
 * 
 * Header section for the user profile management interface.
 * Displays the profile section title and provides controls for editing mode.
 * 
 * Features:
 * - Toggle between view and edit modes
 * - Visual indicator of current mode
 * - Responsive layout
 * - Consistent styling with design system
 * 
 * @example
 * ```tsx
 * <ProfileHeader />
 * ```
 */
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { useProfile } from "./ProfileContext";

export const ProfileHeader = () => {
  const { isEditing, setIsEditing } = useProfile();

  return (
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
  );
};