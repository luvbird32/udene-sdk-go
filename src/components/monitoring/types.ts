import type { Json } from "@/integrations/supabase/types";

export interface DeviceFingerprint {
  id: string;
  risk_score: number | null;
  is_suspicious: boolean | null;
  last_seen: string | null;
  network_info: Json;
  hardware_info: Json;
  device_fingerprint_history: Array<{
    id: string;
    changes: Json;
  }> | null;
}