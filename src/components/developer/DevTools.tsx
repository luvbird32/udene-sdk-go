import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { validateApiKey } from "@/services/api";

export const DevTools = () => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleValidateKey = async () => {
    try {
      console.log("Validating API key:", apiKey);
      const isValid = await validateApiKey(apiKey);
      console.log("API key validation result:", isValid);
      
      toast({
        title: isValid ? "API Key Valid" : "API Key Invalid",
        description: isValid 
          ? "Your API key is valid and active" 
          : "Please check your API key and try again",
        variant: isValid ? "default" : "destructive",
      });
    } catch (error) {
      console.error("API key validation error:", error);
      toast({
        title: "Validation Error",
        description: "Failed to validate API key",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Developer Tools</h2>
      
      <Tabs defaultValue="apikey" className="space-y-4">
        <TabsList>
          <TabsTrigger value="apikey">API Key Validator</TabsTrigger>
          <TabsTrigger value="websocket">WebSocket Tester</TabsTrigger>
          <TabsTrigger value="performance">Performance Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="apikey">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Button 
                onClick={handleValidateKey}
                disabled={!apiKey.trim()}
              >
                Validate
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="websocket">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              WebSocket connection status and real-time message monitoring.
            </p>
            <div className="bg-muted p-4 rounded-md">
              <pre className="text-sm">
                {`WebSocket URL: ws://${window.location.hostname}:8000/ws
Status: Connected
Last Message: None`}
              </pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Monitor API performance metrics and response times.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Average Response Time</h3>
                <p className="text-2xl font-bold">35ms</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Success Rate</h3>
                <p className="text-2xl font-bold">99.9%</p>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};