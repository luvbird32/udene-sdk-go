import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { EmailChangeChart } from "./EmailChangeChart";
import { EmailChangeList } from "./EmailChangeList";
import type { EmailChange } from "./types";

export const EmailChangeMonitoring = () => {
  const { data: emailChanges, isLoading } = useQuery({
    queryKey: ["email-changes"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('user_email_history')
        .select('*')
        .order('changed_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as EmailChange[];
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Email Change Monitoring</h3>
        <Badge variant="outline">
          {emailChanges?.length || 0} Changes Tracked
        </Badge>
      </div>

      <EmailChangeChart data={emailChanges || []} />
      <EmailChangeList changes={emailChanges || []} />
    </Card>
  );
};