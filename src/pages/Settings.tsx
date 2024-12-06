import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings as SettingsIcon, Lock, Key } from "lucide-react";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg"
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">User Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="space-x-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="space-x-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <ProfileSettings profile={profile} setProfile={setProfile} />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <SecuritySettings />
          </Card>
        </TabsContent>

        <TabsContent value="api-keys">
          <Card className="p-6">
            <ApiKeySettings />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;