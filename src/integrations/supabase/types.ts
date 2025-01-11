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
      admin_data_extractions: {
        Row: {
          admin_id: string
          created_at: string | null
          extraction_type: string
          file_url: string | null
          id: string
          query_params: Json | null
          record_count: number | null
          status: string
          updated_at: string | null
        }
        Insert: {
          admin_id: string
          created_at?: string | null
          extraction_type: string
          file_url?: string | null
          id?: string
          query_params?: Json | null
          record_count?: number | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          admin_id?: string
          created_at?: string | null
          extraction_type?: string
          file_url?: string | null
          id?: string
          query_params?: Json | null
          record_count?: number | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      affiliate_activities: {
        Row: {
          affiliate_id: string
          click_id: string | null
          commission_amount: number | null
          conversion_id: string | null
          created_at: string | null
          fraud_indicators: Json | null
          id: string
          ip_address: string | null
          risk_score: number | null
          status: string | null
          transaction_amount: number | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          affiliate_id: string
          click_id?: string | null
          commission_amount?: number | null
          conversion_id?: string | null
          created_at?: string | null
          fraud_indicators?: Json | null
          id?: string
          ip_address?: string | null
          risk_score?: number | null
          status?: string | null
          transaction_amount?: number | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          affiliate_id?: string
          click_id?: string | null
          commission_amount?: number | null
          conversion_id?: string | null
          created_at?: string | null
          fraud_indicators?: Json | null
          id?: string
          ip_address?: string | null
          risk_score?: number | null
          status?: string | null
          transaction_amount?: number | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      ai_activity_monitoring: {
        Row: {
          activity_type: string
          created_at: string | null
          detection_patterns: Json | null
          id: string
          ip_address: string | null
          metadata: Json | null
          risk_score: number | null
          tool_signature: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          detection_patterns?: Json | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          risk_score?: number | null
          tool_signature?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          detection_patterns?: Json | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          risk_score?: number | null
          tool_signature?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      api_credits: {
        Row: {
          created_at: string | null
          id: string
          is_trial: boolean | null
          total_credits: number
          trial_end_date: string | null
          trial_start_date: string | null
          updated_at: string | null
          used_credits: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_trial?: boolean | null
          total_credits?: number
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string | null
          used_credits?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_trial?: boolean | null
          total_credits?: number
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string | null
          used_credits?: number
          user_id?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key_type: string
          key_value: string
          name: string
          project_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key_type?: string
          key_value: string
          name: string
          project_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key_type?: string
          key_value?: string
          name?: string
          project_id?: string | null
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
          error_details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          performance_metrics: Json | null
          request_payload: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          changes?: Json | null
          created_at?: string | null
          entity_id: string
          entity_type: string
          error_details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          performance_metrics?: Json | null
          request_payload?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          changes?: Json | null
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          error_details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          performance_metrics?: Json | null
          request_payload?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      client_api_keys: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key_type: string
          key_value: string
          name: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key_type?: string
          key_value: string
          name: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key_type?: string
          key_value?: string
          name?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      client_services: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          service_type: string
          settings: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          service_type: string
          settings?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          service_type?: string
          settings?: Json | null
          updated_at?: string | null
          user_id?: string
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
      database_metrics: {
        Row: {
          active_queries: number
          cache_hit_ratio: number
          current_connections: number
          id: string
          timestamp: string | null
        }
        Insert: {
          active_queries?: number
          cache_hit_ratio?: number
          current_connections?: number
          id?: string
          timestamp?: string | null
        }
        Update: {
          active_queries?: number
          cache_hit_ratio?: number
          current_connections?: number
          id?: string
          timestamp?: string | null
        }
        Relationships: []
      }
      dependency_scans: {
        Row: {
          created_at: string | null
          id: string
          scan_date: string | null
          scan_log: Json | null
          scan_status: string
          total_dependencies: number
          updated_at: string | null
          vulnerabilities_found: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          scan_date?: string | null
          scan_log?: Json | null
          scan_status: string
          total_dependencies: number
          updated_at?: string | null
          vulnerabilities_found: number
        }
        Update: {
          created_at?: string | null
          id?: string
          scan_date?: string | null
          scan_log?: Json | null
          scan_status?: string
          total_dependencies?: number
          updated_at?: string | null
          vulnerabilities_found?: number
        }
        Relationships: []
      }
      dependency_vulnerabilities: {
        Row: {
          created_at: string | null
          current_version: string
          cve_id: string | null
          description: string | null
          id: string
          package_name: string
          recommended_version: string
          severity: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_version: string
          cve_id?: string | null
          description?: string | null
          id?: string
          package_name: string
          recommended_version: string
          severity: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_version?: string
          cve_id?: string | null
          description?: string | null
          id?: string
          package_name?: string
          recommended_version?: string
          severity?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      device_fingerprint_history: {
        Row: {
          change_type: string
          changes: Json
          created_at: string | null
          device_fingerprint_id: string | null
          id: string
        }
        Insert: {
          change_type: string
          changes: Json
          created_at?: string | null
          device_fingerprint_id?: string | null
          id?: string
        }
        Update: {
          change_type?: string
          changes?: Json
          created_at?: string | null
          device_fingerprint_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_fingerprint_history_device_fingerprint_id_fkey"
            columns: ["device_fingerprint_id"]
            isOneToOne: false
            referencedRelation: "device_fingerprints"
            referencedColumns: ["id"]
          },
        ]
      }
      device_fingerprints: {
        Row: {
          audio_fingerprint: string | null
          browser_info: Json
          canvas_fingerprint: string | null
          color_depth: number | null
          created_at: string | null
          fingerprint_hash: string
          font_fingerprint: Json | null
          hardware_info: Json
          id: string
          is_suspicious: boolean | null
          language_info: string | null
          last_seen: string | null
          network_info: Json
          os_info: Json
          plugin_fingerprint: Json | null
          risk_score: number | null
          screen_resolution: string | null
          timezone_info: string | null
          updated_at: string | null
          user_id: string | null
          webgl_fingerprint: string | null
        }
        Insert: {
          audio_fingerprint?: string | null
          browser_info: Json
          canvas_fingerprint?: string | null
          color_depth?: number | null
          created_at?: string | null
          fingerprint_hash: string
          font_fingerprint?: Json | null
          hardware_info: Json
          id?: string
          is_suspicious?: boolean | null
          language_info?: string | null
          last_seen?: string | null
          network_info: Json
          os_info: Json
          plugin_fingerprint?: Json | null
          risk_score?: number | null
          screen_resolution?: string | null
          timezone_info?: string | null
          updated_at?: string | null
          user_id?: string | null
          webgl_fingerprint?: string | null
        }
        Update: {
          audio_fingerprint?: string | null
          browser_info?: Json
          canvas_fingerprint?: string | null
          color_depth?: number | null
          created_at?: string | null
          fingerprint_hash?: string
          font_fingerprint?: Json | null
          hardware_info?: Json
          id?: string
          is_suspicious?: boolean | null
          language_info?: string | null
          last_seen?: string | null
          network_info?: Json
          os_info?: Json
          plugin_fingerprint?: Json | null
          risk_score?: number | null
          screen_resolution?: string | null
          timezone_info?: string | null
          updated_at?: string | null
          user_id?: string | null
          webgl_fingerprint?: string | null
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
      event_triggers: {
        Row: {
          actions: Json
          conditions: Json
          created_at: string | null
          description: string | null
          event_type: string
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actions?: Json
          conditions?: Json
          created_at?: string | null
          description?: string | null
          event_type: string
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actions?: Json
          conditions?: Json
          created_at?: string | null
          description?: string | null
          event_type?: string
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      extracted_data: {
        Row: {
          created_at: string | null
          data: Json
          id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json
          id?: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
        }
        Relationships: []
      }
      fraud_alerts: {
        Row: {
          alert_type: string
          behavioral_indicators: Json | null
          created_at: string | null
          description: string
          domain_risk_score: number | null
          email_data: Json | null
          id: string
          severity: string
          status: string
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          alert_type: string
          behavioral_indicators?: Json | null
          created_at?: string | null
          description: string
          domain_risk_score?: number | null
          email_data?: Json | null
          id?: string
          severity: string
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          alert_type?: string
          behavioral_indicators?: Json | null
          created_at?: string | null
          description?: string
          domain_risk_score?: number | null
          email_data?: Json | null
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
      identity_verifications: {
        Row: {
          created_at: string | null
          document_country: string | null
          document_expiry: string | null
          document_files: Json | null
          document_number: string | null
          document_type: string | null
          id: string
          rejection_reason: string | null
          risk_flags: Json | null
          selfie_file: string | null
          status: string
          updated_at: string | null
          user_id: string | null
          verification_data: Json | null
          verification_score: number | null
          verification_type: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string | null
          document_country?: string | null
          document_expiry?: string | null
          document_files?: Json | null
          document_number?: string | null
          document_type?: string | null
          id?: string
          rejection_reason?: string | null
          risk_flags?: Json | null
          selfie_file?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
          verification_data?: Json | null
          verification_score?: number | null
          verification_type: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string | null
          document_country?: string | null
          document_expiry?: string | null
          document_files?: Json | null
          document_number?: string | null
          document_type?: string | null
          id?: string
          rejection_reason?: string | null
          risk_flags?: Json | null
          selfie_file?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
          verification_data?: Json | null
          verification_score?: number | null
          verification_type?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      ip_allowlist: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          ip_address: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
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
      ml_models: {
        Row: {
          created_at: string | null
          hyperparameters: Json | null
          id: string
          is_active: boolean | null
          metrics: Json | null
          model_type: string
          training_date: string | null
          training_size: number | null
          validation_metrics: Json | null
          version: string
        }
        Insert: {
          created_at?: string | null
          hyperparameters?: Json | null
          id?: string
          is_active?: boolean | null
          metrics?: Json | null
          model_type: string
          training_date?: string | null
          training_size?: number | null
          validation_metrics?: Json | null
          version: string
        }
        Update: {
          created_at?: string | null
          hyperparameters?: Json | null
          id?: string
          is_active?: boolean | null
          metrics?: Json | null
          model_type?: string
          training_date?: string | null
          training_size?: number | null
          validation_metrics?: Json | null
          version?: string
        }
        Relationships: []
      }
      open_source_scans: {
        Row: {
          created_at: string | null
          dependencies_scanned: number | null
          id: string
          package_manager: string
          project_id: string
          remediation_steps: Json | null
          scan_results: Json | null
          scan_type: string
          severity_breakdown: Json | null
          updated_at: string | null
          vulnerabilities_found: number | null
        }
        Insert: {
          created_at?: string | null
          dependencies_scanned?: number | null
          id?: string
          package_manager: string
          project_id: string
          remediation_steps?: Json | null
          scan_results?: Json | null
          scan_type: string
          severity_breakdown?: Json | null
          updated_at?: string | null
          vulnerabilities_found?: number | null
        }
        Update: {
          created_at?: string | null
          dependencies_scanned?: number | null
          id?: string
          package_manager?: string
          project_id?: string
          remediation_steps?: Json | null
          scan_results?: Json | null
          scan_type?: string
          severity_breakdown?: Json | null
          updated_at?: string | null
          vulnerabilities_found?: number | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      product_security_programs: {
        Row: {
          audit_frequency: string | null
          compliance_requirements: Json | null
          created_at: string | null
          description: string | null
          id: string
          last_audit_date: string | null
          name: string
          next_audit_date: string | null
          risk_assessment: Json | null
          security_controls: Json | null
          status: string
          type: string
          updated_at: string | null
        }
        Insert: {
          audit_frequency?: string | null
          compliance_requirements?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          last_audit_date?: string | null
          name: string
          next_audit_date?: string | null
          risk_assessment?: Json | null
          security_controls?: Json | null
          status?: string
          type: string
          updated_at?: string | null
        }
        Update: {
          audit_frequency?: string | null
          compliance_requirements?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          last_audit_date?: string | null
          name?: string
          next_audit_date?: string | null
          risk_assessment?: Json | null
          security_controls?: Json | null
          status?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: string
          avatar_url: string | null
          backup_codes: Json | null
          created_at: string | null
          email_verified: boolean | null
          id: string
          last_login: string | null
          mfa_enabled: boolean | null
          mfa_secret: string | null
          organization_id: string | null
          organization_name: string | null
          organization_role: string | null
          phone_number: string | null
          preferences: Json | null
          security_settings: Json | null
          session_timeout_minutes: number | null
          settings: Json | null
          status: string
          timezone: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          account_type?: string
          avatar_url?: string | null
          backup_codes?: Json | null
          created_at?: string | null
          email_verified?: boolean | null
          id: string
          last_login?: string | null
          mfa_enabled?: boolean | null
          mfa_secret?: string | null
          organization_id?: string | null
          organization_name?: string | null
          organization_role?: string | null
          phone_number?: string | null
          preferences?: Json | null
          security_settings?: Json | null
          session_timeout_minutes?: number | null
          settings?: Json | null
          status?: string
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          account_type?: string
          avatar_url?: string | null
          backup_codes?: Json | null
          created_at?: string | null
          email_verified?: boolean | null
          id?: string
          last_login?: string | null
          mfa_enabled?: boolean | null
          mfa_secret?: string | null
          organization_id?: string | null
          organization_name?: string | null
          organization_role?: string | null
          phone_number?: string | null
          preferences?: Json | null
          security_settings?: Json | null
          session_timeout_minutes?: number | null
          settings?: Json | null
          status?: string
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_organization"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_code_usage: {
        Row: {
          device_fingerprint: string | null
          id: string
          ip_address: string | null
          is_flagged: boolean | null
          promo_code_id: string | null
          risk_score: number | null
          usage_timestamp: string | null
          user_id: string | null
          validation_results: Json | null
        }
        Insert: {
          device_fingerprint?: string | null
          id?: string
          ip_address?: string | null
          is_flagged?: boolean | null
          promo_code_id?: string | null
          risk_score?: number | null
          usage_timestamp?: string | null
          user_id?: string | null
          validation_results?: Json | null
        }
        Update: {
          device_fingerprint?: string | null
          id?: string
          ip_address?: string | null
          is_flagged?: boolean | null
          promo_code_id?: string | null
          risk_score?: number | null
          usage_timestamp?: string | null
          user_id?: string | null
          validation_results?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_code_usage_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          device_patterns: Json | null
          expires_at: string | null
          id: string
          ip_patterns: Json | null
          is_active: boolean
          risk_score: number | null
          times_used: number
          updated_at: string | null
          usage_limit: number
          validation_rules: Json | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          device_patterns?: Json | null
          expires_at?: string | null
          id?: string
          ip_patterns?: Json | null
          is_active?: boolean
          risk_score?: number | null
          times_used?: number
          updated_at?: string | null
          usage_limit?: number
          validation_rules?: Json | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          device_patterns?: Json | null
          expires_at?: string | null
          id?: string
          ip_patterns?: Json | null
          is_active?: boolean
          risk_score?: number | null
          times_used?: number
          updated_at?: string | null
          usage_limit?: number
          validation_rules?: Json | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          endpoint: string
          first_request_time: string | null
          id: string
          ip_address: string
          last_request_time: string | null
          request_count: number | null
        }
        Insert: {
          endpoint: string
          first_request_time?: string | null
          id?: string
          ip_address: string
          last_request_time?: string | null
          request_count?: number | null
        }
        Update: {
          endpoint?: string
          first_request_time?: string | null
          id?: string
          ip_address?: string
          last_request_time?: string | null
          request_count?: number | null
        }
        Relationships: []
      }
      referral_tracking: {
        Row: {
          created_at: string | null
          device_fingerprint: string | null
          id: string
          ip_address: string | null
          referral_code: string
          referred_id: string
          referrer_id: string
          reward_claimed: boolean | null
          risk_score: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          device_fingerprint?: string | null
          id?: string
          ip_address?: string | null
          referral_code: string
          referred_id: string
          referrer_id: string
          reward_claimed?: boolean | null
          risk_score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          device_fingerprint?: string | null
          id?: string
          ip_address?: string | null
          referral_code?: string
          referred_id?: string
          referrer_id?: string
          reward_claimed?: boolean | null
          risk_score?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reward_program_rules: {
        Row: {
          created_at: string | null
          id: string
          max_daily_points: number | null
          max_daily_redemptions: number | null
          program_type: string
          suspicious_patterns: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_daily_points?: number | null
          max_daily_redemptions?: number | null
          program_type: string
          suspicious_patterns?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          max_daily_points?: number | null
          max_daily_redemptions?: number | null
          program_type?: string
          suspicious_patterns?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rewards_transactions: {
        Row: {
          created_at: string | null
          device_fingerprint: string | null
          id: string
          ip_address: string | null
          merchant_id: string
          points_earned: number
          points_redeemed: number
          program_type: string
          redemption_pattern: Json | null
          risk_indicators: Json | null
          transaction_id: string | null
          transaction_pattern: Json | null
          updated_at: string | null
          user_id: string
          velocity_score: number | null
        }
        Insert: {
          created_at?: string | null
          device_fingerprint?: string | null
          id?: string
          ip_address?: string | null
          merchant_id: string
          points_earned?: number
          points_redeemed?: number
          program_type: string
          redemption_pattern?: Json | null
          risk_indicators?: Json | null
          transaction_id?: string | null
          transaction_pattern?: Json | null
          updated_at?: string | null
          user_id: string
          velocity_score?: number | null
        }
        Update: {
          created_at?: string | null
          device_fingerprint?: string | null
          id?: string
          ip_address?: string | null
          merchant_id?: string
          points_earned?: number
          points_redeemed?: number
          program_type?: string
          redemption_pattern?: Json | null
          risk_indicators?: Json | null
          transaction_id?: string | null
          transaction_pattern?: Json | null
          updated_at?: string | null
          user_id?: string
          velocity_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rewards_transactions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      security_assessments: {
        Row: {
          assessment_type: string
          assigned_to: string | null
          completed_date: string | null
          created_at: string | null
          due_date: string | null
          findings: Json | null
          id: string
          program_id: string | null
          remediation_plan: Json | null
          risk_level: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          assessment_type: string
          assigned_to?: string | null
          completed_date?: string | null
          created_at?: string | null
          due_date?: string | null
          findings?: Json | null
          id?: string
          program_id?: string | null
          remediation_plan?: Json | null
          risk_level?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          assessment_type?: string
          assigned_to?: string | null
          completed_date?: string | null
          created_at?: string | null
          due_date?: string | null
          findings?: Json | null
          id?: string
          program_id?: string | null
          remediation_plan?: Json | null
          risk_level?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_assessments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "product_security_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      security_webhooks: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          id: string
          notification_types: string[] | null
          secret_key: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          notification_types?: string[] | null
          secret_key: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          notification_types?: string[] | null
          secret_key?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      service_investigation_logs: {
        Row: {
          created_at: string | null
          findings: Json | null
          id: string
          investigation_type: string
          manual_actions: Json | null
          notes: string | null
          sanitization_steps: Json | null
          service_id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          findings?: Json | null
          id?: string
          investigation_type: string
          manual_actions?: Json | null
          notes?: string | null
          sanitization_steps?: Json | null
          service_id: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          findings?: Json | null
          id?: string
          investigation_type?: string
          manual_actions?: Json | null
          notes?: string | null
          sanitization_steps?: Json | null
          service_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_investigation_logs_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "client_services"
            referencedColumns: ["id"]
          },
        ]
      }
      table_info: {
        Row: {
          id: string
          last_analyzed: string | null
          row_count: number
          table_name: string
        }
        Insert: {
          id?: string
          last_analyzed?: string | null
          row_count?: number
          table_name: string
        }
        Update: {
          id?: string
          last_analyzed?: string | null
          row_count?: number
          table_name?: string
        }
        Relationships: []
      }
      training_datasets: {
        Row: {
          created_at: string | null
          dataset_version: string
          features: Json
          id: string
          label: boolean
          split_type: string | null
          transaction_id: string | null
        }
        Insert: {
          created_at?: string | null
          dataset_version: string
          features: Json
          id?: string
          label: boolean
          split_type?: string | null
          transaction_id?: string | null
        }
        Update: {
          created_at?: string | null
          dataset_version?: string
          features?: Json
          id?: string
          label?: boolean
          split_type?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_datasets_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
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
      trial_usage: {
        Row: {
          created_at: string | null
          device_fingerprints: Json | null
          end_date: string
          id: string
          ip_addresses: Json | null
          risk_score: number | null
          start_date: string
          status: string | null
          trial_type: string
          updated_at: string | null
          usage_patterns: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_fingerprints?: Json | null
          end_date: string
          id?: string
          ip_addresses?: Json | null
          risk_score?: number | null
          start_date: string
          status?: string | null
          trial_type: string
          updated_at?: string | null
          usage_patterns?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_fingerprints?: Json | null
          end_date?: string
          id?: string
          ip_addresses?: Json | null
          risk_score?: number | null
          start_date?: string
          status?: string | null
          trial_type?: string
          updated_at?: string | null
          usage_patterns?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activities_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_email_history: {
        Row: {
          changed_at: string | null
          device_fingerprint: string | null
          id: string
          ip_address: string | null
          new_email: string
          previous_email: string
          requires_review: boolean | null
          risk_score: number | null
          user_id: string | null
        }
        Insert: {
          changed_at?: string | null
          device_fingerprint?: string | null
          id?: string
          ip_address?: string | null
          new_email: string
          previous_email: string
          requires_review?: boolean | null
          risk_score?: number | null
          user_id?: string | null
        }
        Update: {
          changed_at?: string | null
          device_fingerprint?: string | null
          id?: string
          ip_address?: string | null
          new_email?: string
          previous_email?: string
          requires_review?: boolean | null
          risk_score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_email_history_device_fingerprint_fkey"
            columns: ["device_fingerprint"]
            isOneToOne: false
            referencedRelation: "device_fingerprints"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_threat_reports: {
        Row: {
          created_at: string | null
          description: string | null
          evidence: Json | null
          id: string
          reported_user_id: string | null
          reporter_id: string | null
          severity: string | null
          status: string | null
          threat_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          evidence?: Json | null
          id?: string
          reported_user_id?: string | null
          reporter_id?: string | null
          severity?: string | null
          status?: string | null
          threat_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          evidence?: Json | null
          id?: string
          reported_user_id?: string | null
          reporter_id?: string | null
          severity?: string | null
          status?: string | null
          threat_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      verification_attempts: {
        Row: {
          attempt_data: Json | null
          attempt_type: string
          created_at: string | null
          failure_reason: string | null
          id: string
          ip_address: string | null
          success: boolean | null
          user_agent: string | null
          verification_id: string | null
        }
        Insert: {
          attempt_data?: Json | null
          attempt_type: string
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          ip_address?: string | null
          success?: boolean | null
          user_agent?: string | null
          verification_id?: string | null
        }
        Update: {
          attempt_data?: Json | null
          attempt_type?: string
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          ip_address?: string | null
          success?: boolean | null
          user_agent?: string | null
          verification_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_attempts_verification_id_fkey"
            columns: ["verification_id"]
            isOneToOne: false
            referencedRelation: "identity_verifications"
            referencedColumns: ["id"]
          },
        ]
      }
      vulnerability_scans: {
        Row: {
          created_at: string | null
          end_time: string | null
          findings: Json | null
          id: string
          last_error: string | null
          scan_config: Json | null
          scan_duration: unknown | null
          scan_engine: string | null
          scan_parameters: Json | null
          scan_type: string
          severity_breakdown: Json | null
          start_time: string | null
          status: string
          target_url: string | null
          total_vulnerabilities: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_time?: string | null
          findings?: Json | null
          id?: string
          last_error?: string | null
          scan_config?: Json | null
          scan_duration?: unknown | null
          scan_engine?: string | null
          scan_parameters?: Json | null
          scan_type: string
          severity_breakdown?: Json | null
          start_time?: string | null
          status?: string
          target_url?: string | null
          total_vulnerabilities?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_time?: string | null
          findings?: Json | null
          id?: string
          last_error?: string | null
          scan_config?: Json | null
          scan_duration?: unknown | null
          scan_engine?: string | null
          scan_parameters?: Json | null
          scan_type?: string
          severity_breakdown?: Json | null
          start_time?: string | null
          status?: string
          target_url?: string | null
          total_vulnerabilities?: number | null
          updated_at?: string | null
          user_id?: string
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
      check_rate_limit: {
        Args: {
          p_ip_address: string
          p_endpoint: string
          p_max_requests?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      log_detailed_error: {
        Args: {
          p_event_type: string
          p_user_id: string
          p_error: Json
          p_request?: Json
        }
        Returns: undefined
      }
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
