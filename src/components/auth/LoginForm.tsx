import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';

export const LoginForm = () => {
  return (
    <Card className="glass-card w-full max-w-md mx-auto p-8 shadow-xl">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#4ade80',
              fontWeight: '500',
              ':hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            },
            input: {
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              ':focus': {
                border: '1px solid rgba(255, 255, 255, 0.4)',
                outline: 'none',
              },
            },
            label: {
              color: '#4ade80',
              marginBottom: '0.5rem',
              display: 'block',
            },
            message: {
              color: '#ffffff',
            },
            anchor: {
              color: '#4ade80',
              ':hover': {
                color: '#22c55e',
              },
            },
          },
          className: {
            container: 'space-y-4',
            label: 'text-green-400',
            button: 'w-full glass-button mt-4',
            input: 'glass-input w-full',
          },
        }}
        theme="dark"
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
              link_text: "Don't have an account? Sign up",
              confirmation_text: 'Check your email for the confirmation link'
            }
          }
        }}
      />
    </Card>
  );
};