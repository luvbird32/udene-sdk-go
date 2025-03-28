import { supabase } from "@/integrations/supabase/client";

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  if (!apiKey?.trim()) {
    console.log('Empty Udene API key provided');
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('status')
      .eq('key_value', apiKey)
      .single();

    if (error) {
      console.error('Udene API key validation error:', error);
      return false;
    }

    return data?.status === 'active';
  } catch (error) {
    console.error('Udene API key validation failed:', error);
    return false;
  }
};

export const setApiKey = (apiKey: string): void => {
  localStorage.setItem("udene_api_key", apiKey);
};

export const clearApiKey = (): void => {
  localStorage.removeItem("udene_api_key");
};