export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string | null
          id: string
          key_value: string
          name: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key_value: string
          name: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key_value?: string
          name?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          changes: Json | null
          created_at: string | null
          entity_id: string
          entity_type: string
          event_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          changes?: Json | null
          created_at?: string | null
          entity_id: string
          entity_type: string
          event_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          changes?: Json | null
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          event_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      compliance_reports: {
        Row: {
          created_at: string | null
          download_url: string | null
          generated_by: string | null
          id: string
          report_data: Json | null
          report_period: unknown
          report_type: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          download_url?: string | null
          generated_by?: string | null
          id?: string
          report_data?: Json | null
          report_period: unknown
          report_type: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          download_url?: string | null
          generated_by?: string | null
          id?: string
          report_data?: Json | null
          report_period?: unknown
          report_type?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      email_reputation: {
        Row: {
          email: string
          first_seen: string | null
          fraud_flags: Json
          id: string
          last_updated: string | null
          platform_occurrences: Json
          risk_score: number | null
        }
        Insert: {
          email: string
          first_seen?: string | null
          fraud_flags?: Json
          id?: string
          last_updated?: string | null
          platform_occurrences?: Json
          risk_score?: number | null
        }
        Update: {
          email?: string
          first_seen?: string | null
          fraud_flags?: Json
          id?: string
          last_updated?: string | null
          platform_occurrences?: Json
          risk_score?: number | null
        }
        Relationships: []
      }
      fraud_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          description: string
          id: string
          severity: string
          status: string
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          description: string
          id?: string
          severity: string
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          description?: string
          id?: string
          severity?: string
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fraud_alerts_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics: {
        Row: {
          id: string
          metric_name: string
          metric_value: number
          timestamp: string | null
        }
        Insert: {
          id?: string
          metric_name: string
          metric_value: number
          timestamp?: string | null
        }
        Update: {
          id?: string
          metric_name?: string
          metric_value?: number
          timestamp?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          appeal_timestamp: string | null
          card_present: boolean
          created_at: string | null
          customer_id: string
          device_id: string
          feature_importance: Json | null
          feedback_notes: string | null
          feedback_status: string | null
          id: string
          interaction_patterns: Json | null
          ip_address: string
          is_fraudulent: boolean | null
          location: string
          merchant_id: string
          message_velocity: number | null
          profile_changes: Json | null
          recurring: boolean
          risk_factors: Json | null
          risk_score: number | null
          timestamp: string
          transaction_type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          appeal_timestamp?: string | null
          card_present: boolean
          created_at?: string | null
          customer_id: string
          device_id: string
          feature_importance?: Json | null
          feedback_notes?: string | null
          feedback_status?: string | null
          id?: string
          interaction_patterns?: Json | null
          ip_address: string
          is_fraudulent?: boolean | null
          location: string
          merchant_id: string
          message_velocity?: number | null
          profile_changes?: Json | null
          recurring: boolean
          risk_factors?: Json | null
          risk_score?: number | null
          timestamp?: string
          transaction_type: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          appeal_timestamp?: string | null
          card_present?: boolean
          created_at?: string | null
          customer_id?: string
          device_id?: string
          feature_importance?: Json | null
          feedback_notes?: string | null
          feedback_status?: string | null
          id?: string
          interaction_patterns?: Json | null
          ip_address?: string
          is_fraudulent?: boolean | null
          location?: string
          merchant_id?: string
          message_velocity?: number | null
          profile_changes?: Json | null
          recurring?: boolean
          risk_factors?: Json | null
          risk_score?: number | null
          timestamp?: string
          transaction_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      webhook_deliveries: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          payload: Json
          response_body: string | null
          response_status: number | null
          webhook_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          payload: Json
          response_body?: string | null
          response_status?: number | null
          webhook_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          payload?: Json
          response_body?: string | null
          response_status?: number | null
          webhook_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_deliveries_webhook_id_fkey"
            columns: ["webhook_id"]
            isOneToOne: false
            referencedRelation: "webhooks"
            referencedColumns: ["id"]
          },
        ]
      }
      webhooks: {
        Row: {
          created_at: string | null
          description: string | null
          events: string[]
          failure_count: number | null
          id: string
          is_active: boolean | null
          last_triggered_at: string | null
          secret_key: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          events: string[]
          failure_count?: number | null
          id?: string
          is_active?: boolean | null
          last_triggered_at?: string | null
          secret_key: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          events?: string[]
          failure_count?: number | null
          id?: string
          is_active?: boolean | null
          last_triggered_at?: string | null
          secret_key?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      whitelist: {
        Row: {
          added_at: string | null
          entity_id: string
          entity_type: string
          expires_at: string | null
          id: string
          reason: string
        }
        Insert: {
          added_at?: string | null
          entity_id: string
          entity_type: string
          expires_at?: string | null
          id?: string
          reason: string
        }
        Update: {
          added_at?: string | null
          entity_id?: string
          entity_type?: string
          expires_at?: string | null
          id?: string
          reason?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
