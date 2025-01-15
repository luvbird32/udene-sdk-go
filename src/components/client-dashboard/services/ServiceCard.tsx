import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceDescription } from "./components/ServiceDescription";
import { ServiceFeatureList } from "./components/ServiceFeatureList";
import { ServiceControls } from "./components/ServiceControls";
import { ServiceToggle } from "./components/ServiceToggle";
import { ServiceActionPreferences } from "./components/ServiceActionPreferences";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  isActive: boolean;
  serviceType: string;
  onToggle: (serviceType: string, isActive: boolean) => Promise<void>;
}

export const ServiceCard = ({
  title,
  description,
  features,
  isActive: initialIsActive,
  serviceType,
  onToggle,
}: ServiceCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isToggling, setIsToggling] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isUpdatingPreferences, setIsUpdatingPreferences] = useState(false);

  // Query to get the current service status and preferences
  const { data: serviceData, error: serviceError } = useQuery({
    queryKey: ["service-status", serviceType],
    queryFn: async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) throw new Error("No authenticated user");

        const { data, error } = await supabase
          .from('client_services')
          .select('is_active, action_preferences')
          .eq('user_id', user.id)
          .eq('service_type', serviceType)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          const { data: newService, error: insertError } = await supabase
            .from('client_services')
            .insert({
              user_id: user.id,
              service_type: serviceType,
              is_active: initialIsActive,
            })
            .select('is_active, action_preferences')
            .single();

          if (insertError) throw insertError;
          return newService;
        }

        return data;
      } catch (error) {
        console.error("Service status query error:", error);
        toast({
          title: "Error loading service status",
          description: "Failed to load service status. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    },
    retry: 1,
    staleTime: 1000 * 60,
  });

  if (serviceError) {
    console.error("Service query error:", serviceError);
  }

  const isActive = serviceData?.is_active ?? initialIsActive;

  const handlePreferencesChange = async (newPreferences: any) => {
    setIsUpdatingPreferences(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { error } = await supabase
        .from('client_services')
        .update({ action_preferences: newPreferences })
        .eq('user_id', user.id)
        .eq('service_type', serviceType);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["service-status", serviceType] });
      toast({
        title: "Preferences Updated",
        description: "Service action preferences have been updated successfully.",
      });
    } catch (error) {
      console.error("Preferences update error:", error);
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPreferences(false);
    }
  };

  const handleToggle = async (checked: boolean) => {
    if (isToggling) return;
    
    setIsToggling(true);
    try {
      await onToggle(serviceType, checked);
      queryClient.invalidateQueries({ queryKey: ["service-status", serviceType] });
      toast({
        title: checked ? "Service activated" : "Service deactivated",
        description: `${title} has been ${checked ? "activated" : "deactivated"} successfully.`,
      });
    } catch (error) {
      console.error("Toggle error:", error);
      toast({
        title: "Error",
        description: "Failed to update service status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      <Card className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <ServiceDescription
            title={title}
            description={description}
            serviceType={serviceType}
            isActive={isActive}
          />
          <ServiceToggle 
            isActive={isActive}
            isToggling={isToggling}
            onToggle={handleToggle}
            serviceName={title}
          />
        </div>
        
        {isActive && (
          <ServiceActionPreferences
            preferences={serviceData?.action_preferences || {
              action_type: 'manual',
              automatic_actions: {
                block_ip: true,
                block_device: true,
                block_user: true
              },
              notification_settings: {
                email: true,
                dashboard: true
              }
            }}
            onPreferencesChange={handlePreferencesChange}
            isUpdating={isUpdatingPreferences}
          />
        )}

        <ServiceFeatureList features={features} />
        <ServiceControls
          isActive={isActive}
          serviceType={serviceType}
          onShowDetails={() => setShowDetails(true)}
        />
      </Card>

      <ServiceDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        service={{
          title,
          description,
          features,
          type: serviceType,
        }}
      />
    </>
  );
};