import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, BookOpen, Link, Info, Smartphone } from "lucide-react";
import { JavaScriptSDK } from "./sdk-sections/JavaScriptSDK";
import { ReactNativeSDK } from "./sdk-sections/ReactNativeSDK";
import { PythonSDK } from "./sdk-sections/PythonSDK";
import { SwiftSDK } from "./sdk-sections/SwiftSDK";
import { KotlinSDK } from "./sdk-sections/KotlinSDK";
import { RubySDK } from "./sdk-sections/RubySDK";
import { GoSDK } from "./sdk-sections/GoSDK";
import { QuickStartSection } from "./sections/QuickStartSection";
import { AuthenticationSection } from "./sections/AuthenticationSection";
import { EndpointsSection } from "./sections/EndpointsSection";

export const ApiDocs = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-6 w-6" />
        <h2 className="text-2xl font-bold">API Documentation</h2>
      </div>
      
      <Tabs defaultValue="quickstart" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-black/5 p-1 rounded-lg">
          <TabsTrigger 
            value="quickstart"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            <Info className="h-4 w-4 mr-2" />
            Quick Start
          </TabsTrigger>
          <TabsTrigger 
            value="authentication"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            <Link className="h-4 w-4 mr-2" />
            Authentication
          </TabsTrigger>
          <TabsTrigger 
            value="endpoints"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            <Code className="h-4 w-4 mr-2" />
            Endpoints
          </TabsTrigger>
          <TabsTrigger 
            value="sdks"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            <Smartphone className="h-4 w-4 mr-2" />
            SDKs
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[600px] pr-4">
          <TabsContent value="quickstart">
            <QuickStartSection />
          </TabsContent>

          <TabsContent value="authentication">
            <AuthenticationSection />
          </TabsContent>

          <TabsContent value="endpoints">
            <EndpointsSection />
          </TabsContent>

          <TabsContent value="sdks" className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">SDK Examples</h3>
              <div className="space-y-8">
                <JavaScriptSDK />
                <ReactNativeSDK />
                <PythonSDK />
                <SwiftSDK />
                <KotlinSDK />
                <RubySDK />
                <GoSDK />
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};