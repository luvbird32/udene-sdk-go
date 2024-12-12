import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PromoCodeValidatorProps {
  onValidCode: (code: string) => void;
}

export const PromoCodeValidator = ({ onValidCode }: PromoCodeValidatorProps) => {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validatePromoCode = async () => {
    setIsValidating(true);
    try {
      const { data: promoCode, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      if (!promoCode) {
        toast({
          title: "Invalid Code",
          description: "The promo code you entered is not valid.",
          variant: "destructive",
        });
        return;
      }

      if (promoCode.times_used >= promoCode.usage_limit) {
        toast({
          title: "Code Expired",
          description: "This promo code has reached its usage limit.",
          variant: "destructive",
        });
        return;
      }

      if (promoCode.expires_at && new Date(promoCode.expires_at) < new Date()) {
        toast({
          title: "Code Expired",
          description: "This promo code has expired.",
          variant: "destructive",
        });
        return;
      }

      // Record the usage
      const { error: usageError } = await supabase
        .from('promo_code_usage')
        .insert({
          promo_code_id: promoCode.id,
          ip_address: window.location.hostname,
          device_fingerprint: navigator.userAgent,
        });

      if (usageError) throw usageError;

      toast({
        title: "Success",
        description: "Promo code applied successfully!",
      });
      
      onValidCode(code);
    } catch (error) {
      console.error('Error validating promo code:', error);
      toast({
        title: "Error",
        description: "Failed to validate promo code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        placeholder="Enter promo code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="max-w-[200px]"
      />
      <Button 
        onClick={validatePromoCode}
        disabled={!code || isValidating}
        variant="outline"
      >
        Apply
      </Button>
    </div>
  );
};