import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account"
      });
      
      navigate("/", { replace: true });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 relative">
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

      <div className="container mx-auto py-10 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="icon" className="glass-button">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            className="flex items-center gap-2 glass-button bg-red-500/10 hover:bg-red-500/20"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="glass-card p-6 rounded-lg">
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="glass-card">
              <TabsTrigger value="profile" className="data-[state=active]:bg-green-900/40">
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-green-900/40">
                Security
              </TabsTrigger>
              <TabsTrigger value="api" className="data-[state=active]:bg-green-900/40">
                API Keys
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="animate-fade-in">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value="security" className="animate-fade-in">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="api" className="animate-fade-in">
              <ApiKeySettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;