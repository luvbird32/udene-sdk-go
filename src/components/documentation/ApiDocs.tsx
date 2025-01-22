import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Link, Code, Smartphone } from "lucide-react";
import { QuickStartSection } from "./sections/QuickStartSection";
import { AuthenticationSection } from "./sections/AuthenticationSection";
import { EndpointsSection } from "./sections/EndpointsSection";
import { SDKSection } from "./sections/SDKSection";

export const ApiDocs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API Documentation</h2>
        <p className="text-muted-foreground">
          Learn how to integrate and use our API services.
        </p>
      </div>
      
      <Tabs defaultValue="quickstart" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-black/5 p-1 rounded-lg">
          <TabsTrigger 
            value="quickstart"
            className="data-[state=active]:text-white"
          >
            <Info className="h-4 w-4 mr-2" />
            Quick Start
          </TabsTrigger>
          <TabsTrigger 
            value="authentication"
            className="data-[state=active]:text-white"
          >
            <Link className="h-4 w-4 mr-2" />
            Authentication
          </TabsTrigger>
          <TabsTrigger 
            value="endpoints"
            className="data-[state=active]:text-white"
          >
            <Code className="h-4 w-4 mr-2" />
            Endpoints
          </TabsTrigger>
          <TabsTrigger 
            value="sdks"
            className="data-[state=active]:text-white"
          >
            <Smartphone className="h-4 w-4 mr-2" />
            SDKs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quickstart">
          <QuickStartSection />
        </TabsContent>

        <TabsContent value="authentication">
          <AuthenticationSection />
        </TabsContent>

        <TabsContent value="endpoints">
          <EndpointsSection />
        </TabsContent>

        <TabsContent value="sdks">
          <SDKSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};