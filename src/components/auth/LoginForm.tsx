import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';

export const LoginForm = () => {
  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={[]}
        authOptions={{
          emailRedirectTo: `${window.location.origin}/settings`,
          additionalSignUpFields: [
            {
              key: 'full_name',
              label: 'Full Name',
              type: 'text',
              required: true,
            },
            {
              key: 'date_of_birth',
              label: 'Date of Birth',
              type: 'date',
              required: true,
            },
          ],
        }}
      />
    </Card>
  );
};