import { Json } from '../database';

export interface UserActivitiesTable {
  Row: {
    id: string;
    profile_id: string;
    activity_type: string;
    description: string | null;
    metadata: Json | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    profile_id: string;
    activity_type: string;
    description?: string | null;
    metadata?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    profile_id?: string;
    activity_type?: string;
    description?: string | null;
    metadata?: Json | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}

export interface UserNotificationsTable {
  Row: {
    id: string;
    user_id: string;
    title: string;
    message: string;
    type: string;
    is_read: boolean | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    user_id: string;
    title: string;
    message: string;
    type: string;
    is_read?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    user_id?: string;
    title?: string;
    message?: string;
    type?: string;
    is_read?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}