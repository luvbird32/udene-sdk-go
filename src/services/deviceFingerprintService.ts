import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type { TablesInsert } from "@/integrations/supabase/types";

type DeviceFingerprintInsert = TablesInsert<'device_fingerprints'>;

interface DeviceFingerprint {
  fingerprint_hash: string;
  browser_info: Json;
  os_info: Json;
  hardware_info: Json;
  network_info: Json;
  canvas_fingerprint?: string;
  webgl_fingerprint?: string;
  audio_fingerprint?: string;
  font_fingerprint?: Json;
  plugin_fingerprint?: Json;
  timezone_info?: string;
  language_info?: string;
  screen_resolution?: string;
  color_depth?: number;
}

export const createDeviceFingerprint = async (fingerprint: DeviceFingerprint) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('device_fingerprints')
    .insert([{
      ...fingerprint,
      user_id: user.id
    }] as DeviceFingerprintInsert[])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getDeviceFingerprints = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('device_fingerprints')
    .select('*, device_fingerprint_history(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateDeviceFingerprintRiskScore = async (id: string, risk_score: number, is_suspicious: boolean) => {
  const { data, error } = await supabase
    .from('device_fingerprints')
    .update({ risk_score, is_suspicious })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};