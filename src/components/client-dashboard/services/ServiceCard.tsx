import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";
import { ServiceDescription } from "./components/ServiceDescription";
import { ServiceFeatureList } from "./components/ServiceFeatureList";
import { ServiceControls } from "./components/ServiceControls";
import { ServiceToggle } from "./components/ServiceToggle";
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

  // Query to get the current service status
  const { data: serviceData, error: serviceError } = useQuery({
    queryKey: ["service-status", serviceType],
    queryFn: async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) {
          console.error("Auth error:", authError);
          throw new Error("Authentication failed");
        }
        
        if (!user) {
          throw new Error("No authenticated user");
        }

        // First try to get existing service
        const { data, error } = await supabase
          .from('client_services')
          .select('is_active')
          .eq('user_id', user.id)
          .eq('service_type', serviceType)
          .maybeSingle();

        if (error) {
          console.error("Service fetch error:", error);
          throw error;
        }

        // If no record exists, create one with default state
        if (!data) {
          console.log("Creating new service record for:", serviceType);
          const { data: newService, error: insertError } = await supabase
            .from('client_services')
            .insert({
              user_id: user.id,
              service_type: serviceType,
              is_active: initialIsActive,
            })
            .select('is_active')
            .single();

          if (insertError) {
            console.error("Service creation error:", insertError);
            throw insertError;
          }

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
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
  });

  // Show error toast if service query fails
  if (serviceError) {
    console.error("Service query error:", serviceError);
  }

  // Use the queried status if available, otherwise fall back to the prop
  const isActive = serviceData?.is_active ?? initialIsActive;

  const handleToggle = async (checked: boolean) => {
    if (isToggling) return;
    
    setIsToggling(true);
    try {
      await onToggle(serviceType, checked);
      // Invalidate the query to refetch the latest status
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