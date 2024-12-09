import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export const AuthFormWrapper = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-black text-green-400 relative flex items-center justify-center p-4">
      {/* Matrix Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-500 text-xl animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 7}s`
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md p-8 space-y-8 glass-card rounded-lg backdrop-blur-xl relative z-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-green-400">Welcome Back</h1>
          <p className="text-green-300/70">
            {activeTab === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          defaultValue="login" 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger 
              value="login"
              className="data-[state=active]:bg-green-900/40"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="data-[state=active]:bg-green-900/40"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-green-300/70">
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-green-400 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-green-400 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};