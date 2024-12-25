import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { ClientSettings } from "@/types/settings";
import { useClientSettings } from "./hooks/useClientSettings";
import { NotificationSection } from "./form/NotificationSection";
import { RiskSection } from "./form/RiskSection";

export const ClientSettingsForm = () => {
  const { toast } = useToast();
  const { settings, isLoading, updateSettings } = useClientSettings();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ClientSettings>({
    notification_preferences: {
      email: true,
      sms: false,
    },
    risk_threshold: 75,
    contact_email: '',
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings as ClientSettings);
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await updateSettings(formData);
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
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
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

      <NotificationSection formData={formData} onChange={setFormData} />
      <RiskSection formData={formData} onChange={setFormData} />

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
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