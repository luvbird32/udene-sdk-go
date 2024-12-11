import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ServiceCard } from "./ServiceCard";
import { ClientService } from "@/integrations/supabase/types/client-services";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const FRAUD_DETECTION_SERVICES = [
  {
    type: "transaction_monitoring",
    title: "Transaction Monitoring",
    description: "Real-time monitoring of transactions for suspicious patterns and behaviors",
    features: [
      "Real-time transaction screening",
      "Pattern recognition",
      "Velocity checks",
      "Amount threshold monitoring"
    ]
  },
  {
    type: "device_intelligence",
    title: "Device Intelligence",
    description: "Advanced device fingerprinting and risk assessment",
    features: [
      "Device fingerprinting",
      "Location verification",
      "VPN/Proxy detection",
      "Bot detection"
    ]
  },
  {
    type: "behavioral_analytics",
    title: "Behavioral Analytics",
    description: "Analysis of user behavior patterns to detect anomalies",
    features: [
      "User behavior profiling",
      "Session analysis",
      "Navigation pattern monitoring",
      "Anomaly detection"
    ]
  },
  {
    type: "reward_fraud",
    title: "Reward Program Protection",
    description: "Specialized detection for loyalty and reward program abuse",
    features: [
      "Points fraud detection",
      "Multiple account detection",
      "Rapid redemption monitoring",
      "Program abuse prevention"
    ]
  }
];

export const ServiceManager = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  const { data: activeServices, isLoading } = useQuery({
    queryKey: ["client-services"],
    queryFn: async () => {
      const { data: services, error } = await supabase
        .from("client_services")
        .select("*");

      if (error) throw error;
      return services as ClientService[] || [];
    }
  });

  const toggleService = useMutation({
    mutationFn: async ({ serviceType, isActive }: { serviceType: string; isActive: boolean }) => {
      if (!currentUser?.id) throw new Error("No user found");
      
      const { data: existingService } = await supabase
        .from("client_services")
        .select("*")
        .eq("service_type", serviceType)
        .single();

      if (existingService) {
        const { error } = await supabase
          .from("client_services")
          .update({ is_active: isActive })
          .eq("service_type", serviceType);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("client_services")
          .insert({
            service_type: serviceType,
            is_active: isActive,
            user_id: currentUser.id,
            settings: {}
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-services"] });
    }
  });

  if (isLoading) {
    return <div className="grid gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-48 bg-muted rounded-lg" />
      ))}
    </div>;
  }

  const handleToggle = async (serviceType: string, isActive: boolean) => {
    await toggleService.mutateAsync({ serviceType, isActive });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Fraud Detection Services</h2>
        <p className="text-muted-foreground mt-1">
          Customize your fraud detection strategy by activating the services that best fit your needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {FRAUD_DETECTION_SERVICES.map((service) => (
          <ServiceCard
            key={service.type}
            title={service.title}
            description={service.description}
            features={service.features}
            serviceType={service.type}
            isActive={activeServices?.some(
              (s) => s.service_type === service.type && s.is_active
            ) || false}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};