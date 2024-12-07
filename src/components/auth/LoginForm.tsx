import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session and redirect if found
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      navigate("/dashboard");
    }
  });

  return (
    <Card className="w-full max-w-md p-8 space-y-8 bg-background shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>
      
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'rgb(var(--primary))',
                brandAccent: 'rgb(var(--primary))',
              },
            },
          },
          className: {
            container: 'w-full',
            button: 'w-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90',
            input: 'w-full px-3 py-2 border rounded-md',
          },
        }}
        providers={[]}
        theme="light"
      />

      <div className="text-center text-sm text-muted-foreground">
        <p>
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-primary">
            Privacy Policy
          </a>
        </p>
      </div>
    </Card>
  );
};