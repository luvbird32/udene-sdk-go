import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const AccountTypeIndicator = () => {
  const { data: profile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      console.log("Fetching user profile...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return profile;
    },
    staleTime: 30000, // Cache for 30 seconds
  });

  if (!profile) return null;

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Account Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Type:</span>
              <Badge variant="outline" className="capitalize">
                {profile.account_type}
              </Badge>
            </div>
            {profile.organization_name && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Organization:</span>
                <Badge variant="outline">
                  {profile.organization_name}
                </Badge>
                {profile.organization_role && (
                  <Badge variant="secondary" className="capitalize">
                    {profile.organization_role}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        <Badge 
          variant={profile.role === 'admin' ? 'destructive' : 'default'}
          className="capitalize"
        >
          {profile.role}
        </Badge>
      </div>
    </Card>
  );
};