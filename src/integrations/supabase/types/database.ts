export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      client_services: {
        Row: {
          id: string
          user_id: string
          service_type: string
          is_active: boolean
          settings: Json
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          service_type: string
          is_active?: boolean
          settings?: Json
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          service_type?: string
          is_active?: boolean
          settings?: Json
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_services_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}