import { Card } from "@/components/ui/card";
import { Shield, Lock, UserCheck, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/**
 * SecurityGettingStarted Component
 * 
 * Displays initial setup steps and guidance for security features
 */
export const SecurityGettingStarted = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Getting Started with Security</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">1. Security Assessment</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Start with a comprehensive security scan to identify potential vulnerabilities in your system.
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/dashboard/security/assessment")}
          >
            Run First Scan
          </Button>
        </Card>

        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-green-500" />
            <h3 className="font-medium">2. Configure Access</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Set up authentication rules and user permissions to protect sensitive data.
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/dashboard/security/access")}
          >
            Configure Access
          </Button>
        </Card>

        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-yellow-500" />
            <h3 className="font-medium">3. Alert Settings</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Customize your security alerts and notification preferences.
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/dashboard/security/alerts")}
          >
            Set Up Alerts
          </Button>
        </Card>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <h4 className="font-medium mb-2">Security Best Practices</h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Regularly update your security scans</li>
          <li>Enable two-factor authentication</li>
          <li>Monitor security logs frequently</li>
          <li>Keep your dependencies up to date</li>
          <li>Review access permissions periodically</li>
        </ul>
      </div>
    </Card>
  );
};