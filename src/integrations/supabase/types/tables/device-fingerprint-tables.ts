import { Json } from '../database';

export interface DeviceFingerprintTable {
  Row: {
    id: string;
    user_id: string | null;
    fingerprint_hash: string;
    browser_info: Json;
    os_info: Json;
    hardware_info: Json;
    network_info: Json;
    canvas_fingerprint: string | null;
    webgl_fingerprint: string | null;
    audio_fingerprint: string | null;
    font_fingerprint: Json | null;
    plugin_fingerprint: Json | null;
    timezone_info: string | null;
    language_info: string | null;
    screen_resolution: string | null;
    color_depth: number | null;
    risk_score: number | null;
    is_suspicious: boolean | null;
    last_seen: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: {
    id?: string;
    user_id?: string | null;
    fingerprint_hash: string;
    browser_info: Json;
    os_info: Json;
    hardware_info: Json;
    network_info: Json;
    canvas_fingerprint?: string | null;
    webgl_fingerprint?: string | null;
    audio_fingerprint?: string | null;
    font_fingerprint?: Json | null;
    plugin_fingerprint?: Json | null;
    timezone_info?: string | null;
    language_info?: string | null;
    screen_resolution?: string | null;
    color_depth?: number | null;
    risk_score?: number | null;
    is_suspicious?: boolean | null;
    last_seen?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
  Update: {
    id?: string;
    user_id?: string | null;
    fingerprint_hash?: string;
    browser_info?: Json;
    os_info?: Json;
    hardware_info?: Json;
    network_info?: Json;
    canvas_fingerprint?: string | null;
    webgl_fingerprint?: string | null;
    audio_fingerprint?: string | null;
    font_fingerprint?: Json | null;
    plugin_fingerprint?: Json | null;
    timezone_info?: string | null;
    language_info?: string | null;
    screen_resolution?: string | null;
    color_depth?: number | null;
    risk_score?: number | null;
    is_suspicious?: boolean | null;
    last_seen?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}

export interface DeviceFingerprintHistoryTable {
  Row: {
    id: string;
    device_fingerprint_id: string | null;
    change_type: string;
    changes: Json;
    created_at: string | null;
  };
  Insert: {
    id?: string;
    device_fingerprint_id?: string | null;
    change_type: string;
    changes: Json;
    created_at?: string | null;
  };
  Update: {
    id?: string;
    device_fingerprint_id?: string | null;
    change_type?: string;
    changes?: Json;
    created_at?: string | null;
  };
}