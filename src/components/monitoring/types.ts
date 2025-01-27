export interface DeviceFingerprint {
  id: string;
  user_id: string | null;
  fingerprint_hash: string;
  browser_info: any;
  os_info: any;
  hardware_info: any;
  network_info: any;
  canvas_fingerprint: string | null;
  webgl_fingerprint: string | null;
  audio_fingerprint: string | null;
  font_fingerprint: any | null;
  plugin_fingerprint: any | null;
  timezone_info: string | null;
  language_info: string | null;
  screen_resolution: string | null;
  color_depth: number | null;
  risk_score: number | null;
  is_suspicious: boolean | null;
  last_seen: string | null;
  created_at: string | null;
  updated_at: string | null;
}