/**
 * DashboardTabs Component
 * 
 * Renders the navigation tabs for the dashboard interface.
 * Allows users to switch between different dashboard views.
 * 
 * Features:
 * - Tab navigation
 * - Visual indicators for active tab
 * - Responsive design
 */
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DashboardTabs = () => {
  return (
    <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
      {/* Overview Tab */}
      <TabsTrigger value="dashboard">
        Overview
      </TabsTrigger>
      
      {/* Detailed Content Tab */}
      <TabsTrigger value="content">
        Content
      </TabsTrigger>
    </TabsList>
  );
};