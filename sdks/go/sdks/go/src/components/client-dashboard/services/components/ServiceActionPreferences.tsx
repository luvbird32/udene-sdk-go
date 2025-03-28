import { AutomaticActionsSection } from "./action-preferences/AutomaticActionsSection";
import type { ServiceActionPreferences as ServiceActionPreferencesType } from "../types";

interface ServiceActionPreferencesProps {
  preferences: ServiceActionPreferencesType;
  onPreferencesChange: (newPreferences: ServiceActionPreferencesType) => void;
  isUpdating: boolean;
}

export const ServiceActionPreferences = ({
  preferences,
  onPreferencesChange,
  isUpdating
}: ServiceActionPreferencesProps) => {
  return (
    <AutomaticActionsSection
      preferences={preferences}
      onPreferencesChange={onPreferencesChange}
      isUpdating={isUpdating}
    />
  );
};