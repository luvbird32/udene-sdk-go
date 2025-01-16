export interface ServiceSettings {
  description?: string;
  features?: string[];
  [key: string]: any;
}

export interface ServiceActionPreferences {
  action_type: "manual" | "automatic";
  automatic_actions: {
    block_ip: boolean;
    block_device: boolean;
    block_user: boolean;
  };
  notification_settings: {
    email: boolean;
    dashboard: boolean;
  };
}

export interface ServiceHeaderProps {
  title: string;
  description: string;
  serviceType: string;
  isActive: boolean;
}