import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ClientSettingsData } from "@/components/settings/types";

export const ClientSettingsForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: settings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ["client-settings"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('profiles')
        .select('settings')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return (data?.settings || {}) as ClientSettingsData;
    },
  });

  const [formData, setFormData] = useState<ClientSettingsData>({
    notification_preferences: {
      email: true,
      sms: false,
    },
    risk_threshold: 75,
    contact_email: '',
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        ...formData,
        ...settings,
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          settings: formData as any, // Cast to any to satisfy TypeScript
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      await queryClient.invalidateQueries({ queryKey: ["client-settings"] });

      toast({
        title: "Settings Updated",
        description: "Your settings have been successfully updated.",
      });

    } catch (err: any) {
      console.error('Settings update error:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingSettings) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="contact_email">Contact Email</Label>
        <Input
          id="contact_email"
          type="email"
          value={formData.contact_email || ''}
          onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
          placeholder="Enter contact email for notifications"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="risk_threshold">Risk Threshold</Label>
        <Input
          id="risk_threshold"
          type="number"
          min="0"
          max="100"
          value={formData.risk_threshold || 75}
          onChange={(e) => setFormData({ ...formData, risk_threshold: Number(e.target.value) })}
        />
        <p className="text-sm text-muted-foreground">
          Transactions above this risk score will trigger alerts
        </p>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          'Update Settings'
        )}
      </Button>
    </form>
  );
};