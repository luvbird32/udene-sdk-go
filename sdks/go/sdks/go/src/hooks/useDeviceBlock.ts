
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { generateDeviceFingerprint } from "@/utils/deviceFingerprint";

export const useDeviceBlock = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["device-block-check"],
    queryFn: async () => {
      try {
        const deviceData = await generateDeviceFingerprint();
        
        const { data, error } = await supabase
          .rpc('is_device_blocked', {
            device_fp: deviceData.fingerprint_hash
          });

        if (error) throw error;

        if (data) {
          toast({
            title: "Device Blocked",
            description: "This device has already used a free trial and is not eligible for another one.",
            variant: "destructive",
          });
        }

        return data;
      } catch (error) {
        console.error("Error checking device block status:", error);
        return false;
      }
    },
  });
};
