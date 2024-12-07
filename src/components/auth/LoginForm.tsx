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
        onlyThirdPartyProviders={false}
        redirectTo={`${window.location.origin}/settings`}
        view="sign_up"
        showLinks={true}
        localization={{
          variables: {
            sign_up: {
              email_label: 'Email',
              password_label: 'Password',
              email_input_placeholder: 'Your email address',
              password_input_placeholder: 'Your password',
              button_label: 'Sign Up',
              loading_button_label: 'Signing up ...',
              social_provider_text: 'Sign in with {{provider}}',
              link_text: 'Don\'t have an account? Sign up',
              confirmation_text: 'Check your email for the confirmation link'
            }
          }
        }}
      />
    </Card>
  );
};