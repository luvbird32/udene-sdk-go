import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LoadingState } from "./affiliate/LoadingState";
import { EmptyState } from "./affiliate/EmptyState";
import { AffiliateChart } from "./affiliate/AffiliateChart";
import { useAffiliateData } from "./affiliate/useAffiliateData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AffiliateMonitoring = () => {
  const { toast } = useToast();
  const { data: affiliateStats, isLoading, error } = useAffiliateData();

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load affiliate activity data. Please try again later.",
    });
    
    return (
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-primary">Affiliate Activity Monitoring</h3>
          <Badge variant="outline">Risk Trends</Badge>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-foreground">
            Failed to load affiliate activity data. Please try again later.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!affiliateStats || affiliateStats.length === 0) {
    return <EmptyState />;
  }

  return (
    <ErrorBoundary>
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-primary">Affiliate Activity Monitoring</h3>
          <Badge variant="outline">Risk Trends</Badge>
        </div>
        <AffiliateChart data={affiliateStats} />
      </Card>
    </ErrorBoundary>
  );
};