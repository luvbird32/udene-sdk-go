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
          id: string;
          username: string | null;
          avatar_url: string | null;
          created_at: string | null;
          updated_at: string | null;
          role: string;
          account_type: string;
          organization_id: string | null;
          organization_name: string | null;
          organization_role: string | null;
          status: string;
          settings: Json | null;
        };
        Insert: {
          id: string;
          username?: string | null;
          avatar_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          role?: string;
          account_type?: string;
          organization_id?: string | null;
          organization_name?: string | null;
          organization_role?: string | null;
          status?: string;
          settings?: Json | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          avatar_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          role?: string;
          account_type?: string;
          organization_id?: string | null;
          organization_name?: string | null;
          organization_role?: string | null;
          status?: string;
          settings?: Json | null;
        };
      };
      api_keys: {
        Row: {
          id: string;
          key_value: string;
          name: string;
          status: string;
          created_at: string | null;
          updated_at: string | null;
          description: string | null;
          project_id: string | null;
        };
        Insert: {
          id?: string;
          key_value: string;
          name: string;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
          description?: string | null;
          project_id?: string | null;
        };
        Update: {
          id?: string;
          key_value?: string;
          name?: string;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
          description?: string | null;
          project_id?: string | null;
        };
      };
      client_api_keys: {
        Row: {
          id: string;
          user_id: string;
          key_value: string;
          name: string;
          description: string | null;
          status: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          key_value: string;
          name: string;
          description?: string | null;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          key_value?: string;
          name?: string;
          description?: string | null;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      api_credits: {
        Row: {
          id: string;
          user_id: string;
          total_credits: number;
          used_credits: number;
          trial_start_date: string | null;
          trial_end_date: string | null;
          is_trial: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_credits?: number;
          used_credits?: number;
          trial_start_date?: string | null;
          trial_end_date?: string | null;
          is_trial?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_credits?: number;
          used_credits?: number;
          trial_start_date?: string | null;
          trial_end_date?: string | null;
          is_trial?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      user_activities: {
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
      };
      user_notifications: {
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
      };
      fraud_alerts: {
        Row: {
          id: string;
          alert_type: string;
          severity: string;
          description: string;
          transaction_id: string | null;
          status: string;
          created_at: string | null;
          updated_at: string | null;
          behavioral_indicators: Json | null;
          domain_risk_score: number | null;
          email_data: Json | null;
        };
        Insert: {
          id?: string;
          alert_type: string;
          severity: string;
          description: string;
          transaction_id?: string | null;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
          behavioral_indicators?: Json | null;
          domain_risk_score?: number | null;
          email_data?: Json | null;
        };
        Update: {
          id?: string;
          alert_type?: string;
          severity?: string;
          description?: string;
          transaction_id?: string | null;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
          behavioral_indicators?: Json | null;
          domain_risk_score?: number | null;
          email_data?: Json | null;
        };
      };
      email_reputation: {
        Row: {
          id: string;
          email: string;
          risk_score: number | null;
          fraud_flags: Json;
          platform_occurrences: Json;
          first_seen: string | null;
          last_updated: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          risk_score?: number | null;
          fraud_flags?: Json;
          platform_occurrences?: Json;
          first_seen?: string | null;
          last_updated?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          risk_score?: number | null;
          fraud_flags?: Json;
          platform_occurrences?: Json;
          first_seen?: string | null;
          last_updated?: string | null;
        };
      };
      referral_tracking: {
        Row: {
          id: string;
          referrer_id: string;
          referred_id: string;
          referral_code: string;
          status: string | null;
          risk_score: number | null;
          reward_claimed: boolean | null;
          ip_address: string | null;
          device_fingerprint: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          referrer_id: string;
          referred_id: string;
          referral_code: string;
          status?: string | null;
          risk_score?: number | null;
          reward_claimed?: boolean | null;
          ip_address?: string | null;
          device_fingerprint?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          referrer_id?: string;
          referred_id?: string;
          referral_code?: string;
          status?: string | null;
          risk_score?: number | null;
          reward_claimed?: boolean | null;
          ip_address?: string | null;
          device_fingerprint?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      ml_models: {
        Row: {
          id: string;
          model_type: string;
          version: string;
          is_active: boolean | null;
          training_date: string | null;
          training_size: number | null;
          metrics: Json | null;
          hyperparameters: Json | null;
          validation_metrics: Json | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          model_type: string;
          version: string;
          is_active?: boolean | null;
          training_date?: string | null;
          training_size?: number | null;
          metrics?: Json | null;
          hyperparameters?: Json | null;
          validation_metrics?: Json | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          model_type?: string;
          version?: string;
          is_active?: boolean | null;
          training_date?: string | null;
          training_size?: number | null;
          metrics?: Json | null;
          hyperparameters?: Json | null;
          validation_metrics?: Json | null;
          created_at?: string | null;
        };
      };
      training_datasets: {
        Row: {
          id: string;
          dataset_version: string;
          features: Json;
          label: boolean;
          split_type: string | null;
          transaction_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          dataset_version: string;
          features: Json;
          label: boolean;
          split_type?: string | null;
          transaction_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          dataset_version?: string;
          features?: Json;
          label?: boolean;
          split_type?: string | null;
          transaction_id?: string | null;
          created_at?: string | null;
        };
      };
      ai_activity_monitoring: {
        Row: {
          id: string;
          user_id: string | null;
          activity_type: string;
          detection_patterns: Json | null;
          risk_score: number | null;
          metadata: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          tool_signature: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          activity_type: string;
          detection_patterns?: Json | null;
          risk_score?: number | null;
          metadata?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          tool_signature?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          activity_type?: string;
          detection_patterns?: Json | null;
          risk_score?: number | null;
          metadata?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          tool_signature?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      metrics: {
        Row: {
          id: string;
          metric_name: string;
          metric_value: number;
          timestamp: string | null;
        };
        Insert: {
          id?: string;
          metric_name: string;
          metric_value: number;
          timestamp?: string | null;
        };
        Update: {
          id?: string;
          metric_name?: string;
          metric_value?: number;
          timestamp?: string | null;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          event_type: string;
          entity_type: string;
          entity_id: string;
          changes: Json | null;
          user_id: string | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          event_type: string;
          entity_type: string;
          entity_id: string;
          changes?: Json | null;
          user_id?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          event_type?: string;
          entity_type?: string;
          entity_id?: string;
          changes?: Json | null;
          user_id?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string | null;
        };
      };
      product_security_programs: {
        Row: {
          id: string;
          name: string;
          type: string;
          description: string | null;
          status: string;
          security_controls: Json | null;
          compliance_requirements: Json | null;
          risk_assessment: Json | null;
          audit_frequency: string | null;
          last_audit_date: string | null;
          next_audit_date: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          description?: string | null;
          status?: string;
          security_controls?: Json | null;
          compliance_requirements?: Json | null;
          risk_assessment?: Json | null;
          audit_frequency?: string | null;
          last_audit_date?: string | null;
          next_audit_date?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          description?: string | null;
          status?: string;
          security_controls?: Json | null;
          compliance_requirements?: Json | null;
          risk_assessment?: Json | null;
          audit_frequency?: string | null;
          last_audit_date?: string | null;
          next_audit_date?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      security_assessments: {
        Row: {
          id: string;
          assessment_type: string;
          status: string;
          findings: Json | null;
          risk_level: string | null;
          remediation_plan: Json | null;
          assigned_to: string | null;
          program_id: string | null;
          due_date: string | null;
          completed_date: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          assessment_type: string;
          status?: string;
          findings?: Json | null;
          risk_level?: string | null;
          remediation_plan?: Json | null;
          assigned_to?: string | null;
          program_id?: string | null;
          due_date?: string | null;
          completed_date?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          assessment_type?: string;
          status?: string;
          findings?: Json | null;
          risk_level?: string | null;
          remediation_plan?: Json | null;
          assigned_to?: string | null;
          program_id?: string | null;
          due_date?: string | null;
          completed_date?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      compliance_reports: {
        Row: {
          id: string;
          report_type: string;
          report_period: unknown;
          status: string;
          report_data: Json | null;
          generated_by: string | null;
          download_url: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          report_type: string;
          report_period: unknown;
          status?: string;
          report_data?: Json | null;
          generated_by?: string | null;
          download_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          report_type?: string;
          report_period?: unknown;
          status?: string;
          report_data?: Json | null;
          generated_by?: string | null;
          download_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      webhooks: {
        Row: {
          id: string;
          url: string;
          events: string[];
          is_active: boolean | null;
          description: string | null;
          secret_key: string;
          failure_count: number | null;
          last_triggered_at: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          url: string;
          events: string[];
          is_active?: boolean | null;
          description?: string | null;
          secret_key: string;
          failure_count?: number | null;
          last_triggered_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          url?: string;
          events?: string[];
          is_active?: boolean | null;
          description?: string | null;
          secret_key?: string;
          failure_count?: number | null;
          last_triggered_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      webhook_deliveries: {
        Row: {
          id: string;
          webhook_id: string | null;
          event_type: string;
          payload: Json;
          response_status: number | null;
          response_body: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          webhook_id?: string | null;
          event_type: string;
          payload: Json;
          response_status?: number | null;
          response_body?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          webhook_id?: string | null;
          event_type?: string;
          payload?: Json;
          response_status?: number | null;
          response_body?: string | null;
          created_at?: string | null;
        };
      };
      transactions: {
        Row: {
          id: string;
          amount: number;
          merchant_id: string;
          customer_id: string;
          timestamp: string;
          location: string;
          device_id: string;
          ip_address: string;
          transaction_type: string;
          card_present: boolean;
          recurring: boolean;
          risk_score: number | null;
          is_fraudulent: boolean | null;
          created_at: string | null;
          updated_at: string | null;
          risk_factors: Json | null;
          feature_importance: Json | null;
          feedback_status: string | null;
          feedback_notes: string | null;
          appeal_timestamp: string | null;
          message_velocity: number | null;
          profile_changes: Json | null;
          interaction_patterns: Json | null;
        };
        Insert: {
          id?: string;
          amount: number;
          merchant_id: string;
          customer_id: string;
          timestamp?: string;
          location: string;
          device_id: string;
          ip_address: string;
          transaction_type: string;
          card_present: boolean;
          recurring: boolean;
          risk_score?: number | null;
          is_fraudulent?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
          risk_factors?: Json | null;
          feature_importance?: Json | null;
          feedback_status?: string | null;
          feedback_notes?: string | null;
          appeal_timestamp?: string | null;
          message_velocity?: number | null;
          profile_changes?: Json | null;
          interaction_patterns?: Json | null;
        };
        Update: {
          id?: string;
          amount?: number;
          merchant_id?: string;
          customer_id?: string;
          timestamp?: string;
          location?: string;
          device_id?: string;
          ip_address?: string;
          transaction_type?: string;
          card_present?: boolean;
          recurring?: boolean;
          risk_score?: number | null;
          is_fraudulent?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
          risk_factors?: Json | null;
          feature_importance?: Json | null;
          feedback_status?: string | null;
          feedback_notes?: string | null;
          appeal_timestamp?: string | null;
          message_velocity?: number | null;
          profile_changes?: Json | null;
          interaction_patterns?: Json | null;
        };
      };
      rewards_transactions: {
        Row: {
          id: string;
          user_id: string;
          merchant_id: string;
          transaction_id: string | null;
          program_type: string;
          points_earned: number;
          points_redeemed: number;
          device_fingerprint: string | null;
          ip_address: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          merchant_id: string;
          transaction_id?: string | null;
          program_type: string;
          points_earned?: number;
          points_redeemed?: number;
          device_fingerprint?: string | null;
          ip_address?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          merchant_id?: string;
          transaction_id?: string | null;
          program_type?: string;
          points_earned?: number;
          points_redeemed?: number;
          device_fingerprint?: string | null;
          ip_address?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      affiliate_activities: {
        Row: {
          id: string;
          affiliate_id: string;
          click_id: string | null;
          conversion_id: string | null;
          transaction_amount: number | null;
          commission_amount: number | null;
          status: string | null;
          risk_score: number | null;
          fraud_indicators: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          affiliate_id: string;
          click_id?: string | null;
          conversion_id?: string | null;
          transaction_amount?: number | null;
          commission_amount?: number | null;
          status?: string | null;
          risk_score?: number | null;
          fraud_indicators?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          affiliate_id?: string;
          click_id?: string | null;
          conversion_id?: string | null;
          transaction_amount?: number | null;
          commission_amount?: number | null;
          status?: string | null;
          risk_score?: number | null;
          fraud_indicators?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      trial_usage: {
        Row: {
          id: string;
          user_id: string;
          trial_type: string;
          start_date: string;
          end_date: string;
          status: string | null;
          risk_score: number | null;
          ip_addresses: Json | null;
          device_fingerprints: Json | null;
          usage_patterns: Json | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          trial_type: string;
          start_date: string;
          end_date: string;
          status?: string | null;
          risk_score?: number | null;
          ip_addresses?: Json | null;
          device_fingerprints?: Json | null;
          usage_patterns?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          trial_type?: string;
          start_date?: string;
          end_date?: string;
          status?: string | null;
          risk_score?: number | null;
          ip_addresses?: Json | null;
          device_fingerprints?: Json | null;
          usage_patterns?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];