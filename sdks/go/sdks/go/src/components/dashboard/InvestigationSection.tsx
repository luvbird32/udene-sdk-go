import { Card } from "@/components/ui/card";
import { InvestigationLogs } from "@/components/client-dashboard/investigation/InvestigationLogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const InvestigationSection = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Security Investigations</h2>
      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Investigations</TabsTrigger>
          <TabsTrigger value="all">All Investigations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <InvestigationLogs filterStatus="in_progress" />
        </TabsContent>
        
        <TabsContent value="all">
          <InvestigationLogs />
        </TabsContent>
      </Tabs>
    </Card>
  );
};