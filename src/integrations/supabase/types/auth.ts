import { Database } from "./database";

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type UserActivity = Database['public']['Tables']['user_activities']['Row'];
export type UserActivityInsert = Database['public']['Tables']['user_activities']['Insert'];
export type UserActivityUpdate = Database['public']['Tables']['user_activities']['Update'];

export type UserNotification = Database['public']['Tables']['user_notifications']['Row'];
export type UserNotificationInsert = Database['public']['Tables']['user_notifications']['Insert'];
export type UserNotificationUpdate = Database['public']['Tables']['user_notifications']['Update'];