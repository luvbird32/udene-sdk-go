import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingState } from "@/components/ui/states/LoadingState";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { EmptyState } from "@/components/ui/states/EmptyState";
import { EmailChangeList } from "./email-change/EmailChangeList";
import { EmailChangeChart } from "./email-change/EmailChangeChart";
import type { EmailChange } from "./email-change/types";

export const EmailChangeMonitoring = () => {
  const { data: emailChanges, isLoading, error } = useQuery({
    queryKey: ["client-email-changes"],
    queryFn: async () => {
      console.log("Fetching client email change history...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from('user_email_history')
        .select('*')
        .eq('user_id', user.id)
        .order('changed_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error fetching email history:", error);
        throw error;
      }

      console.log("Email changes fetched:", data?.length || 0, "records");
      return data as EmailChange[];
    },
    refetchInterval: 10000,
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <LoadingState message="Loading your email change history..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <ErrorState error={error} />
      </Card>
    );
  }

  if (!emailChanges || emailChanges.length === 0) {
    return (
      <Card className="p-6">
        <EmptyState message="No email changes detected" />
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Email Change History</h3>
        <Badge variant="outline">
          {emailChanges?.length || 0} Changes Tracked
        </Badge>
      </div>

      <EmailChangeChart data={emailChanges} />
      <EmailChangeList changes={emailChanges} />
    </Card>
  );
};