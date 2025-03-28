import { Json } from "@/integrations/supabase/types/database";

export const formatFindings = (findings: Json) => {
  if (!findings) return "No findings recorded";
  try {
    const findingsObj = typeof findings === 'string' ? JSON.parse(findings) : findings;
    if (typeof findingsObj === 'object' && findingsObj !== null) {
      return Object.entries(findingsObj)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    }
    return String(findingsObj);
  } catch {
    return "Unable to parse findings";
  }
};