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
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          created_at: string | null
          updated_at: string | null
          role: string
          account_type: string
          organization_id: string | null
          organization_name: string | null
          organization_role: string | null
          status: string
          settings: Json | null
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
          role?: string
          account_type?: string
          organization_id?: string | null
          organization_name?: string | null
          organization_role?: string | null
          status?: string
          settings?: Json | null
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
          role?: string
          account_type?: string
          organization_id?: string | null
          organization_name?: string | null
          organization_role?: string | null
          status?: string
          settings?: Json | null
        }
      }
      transactions: {
        Row: {
          id: string
          amount: number
          merchant_id: string
          customer_id: string
          timestamp: string
          location: string
          device_id: string
          ip_address: string
          transaction_type: string
          card_present: boolean
          recurring: boolean
          risk_score: number | null
          is_fraudulent: boolean | null
          created_at: string | null
          updated_at: string | null
          risk_factors: Json | null
          feature_importance: Json | null
          feedback_status: string | null
          feedback_notes: string | null
          appeal_timestamp: string | null
          message_velocity: number | null
          profile_changes: Json | null
          interaction_patterns: Json | null
        }
        Insert: {
          id?: string
          amount: number
          merchant_id: string
          customer_id: string
          timestamp?: string
          location: string
          device_id: string
          ip_address: string
          transaction_type: string
          card_present: boolean
          recurring: boolean
          risk_score?: number | null
          is_fraudulent?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          risk_factors?: Json | null
          feature_importance?: Json | null
          feedback_status?: string | null
          feedback_notes?: string | null
          appeal_timestamp?: string | null
          message_velocity?: number | null
          profile_changes?: Json | null
          interaction_patterns?: Json | null
        }
        Update: {
          id?: string
          amount?: number
          merchant_id?: string
          customer_id?: string
          timestamp?: string
          location?: string
          device_id?: string
          ip_address?: string
          transaction_type?: string
          card_present?: boolean
          recurring?: boolean
          risk_score?: number | null
          is_fraudulent?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          risk_factors?: Json | null
          feature_importance?: Json | null
          feedback_status?: string | null
          feedback_notes?: string | null
          appeal_timestamp?: string | null
          message_velocity?: number | null
          profile_changes?: Json | null
          interaction_patterns?: Json | null
        }
      }
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
