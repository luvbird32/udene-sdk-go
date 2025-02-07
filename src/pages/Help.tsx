
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight, Book, Shield, Zap, Terminal, Code, Users, Bell, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const helpSections = [
    {
      title: "Getting Started",
      icon: Book,
      content: [
        "Create and set up your account with secure credentials",
        "Complete your profile with required information",
        "Set up two-factor authentication for enhanced security",
        "Configure your notification preferences",
        "Customize your dashboard layout",
        "Learn about our security features",
        "Understand account roles and permissions",
        "Set up team collaboration settings"
      ]
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      content: [
        "Enable fraud detection monitoring for transactions",
        "Set up IP address filtering and whitelisting",
        "Configure security alerts and notifications",
        "Review security logs and audit reports",
        "Manage device fingerprinting settings",
        "Set up data encryption preferences",
        "Configure session timeout settings",
        "Review and manage authorized devices"
      ]
    },
    {
      title: "API Integration",
      icon: Terminal,
      content: [
        "Access comprehensive API documentation",
        "Generate and manage API keys",
        "View real-time API usage statistics",
        "Test API endpoints in sandbox environment",
        "Implement webhook integrations",
        "Monitor API performance metrics",
        "Set up rate limiting rules",
        "Handle API error responses"
      ]
    },
    {
      title: "Developer Tools",
      icon: Code,
      content: [
        "Access SDK documentation and guides",
        "Use our testing environment",
        "Implement fraud detection algorithms",
        "Debug API integration issues",
        "Access code samples and examples",
        "Use our CLI tools effectively",
        "Understand versioning system",
        "Access developer support channels"
      ]
    },
    {
      title: "Account Management",
      icon: Users,
      content: [
        "Manage team member access and roles",
        "Update billing information and plans",
        "View usage reports and analytics",
        "Configure organizational settings",
        "Set up SSO integration",
        "Manage API access controls",
        "Review account activity logs",
        "Set up backup authentication methods"
      ]
    },
    {
      title: "Monitoring & Alerts",
      icon: Bell,
      content: [
        "Set up custom alert rules",
        "Configure notification channels",
        "Monitor system health metrics",
        "Track suspicious activities",
        "Set up automated responses",
        "Configure alert thresholds",
        "Manage incident response plans",
        "Review historical alert data"
      ]
    },
    {
      title: "Dashboard Features",
      icon: LayoutDashboard,
      content: [
        "Customize dashboard widgets",
        "Set up data visualization preferences",
        "Configure real-time monitoring views",
        "Create custom report templates",
        "Set up automated reporting",
        "Configure data export options",
        "Manage dashboard sharing",
        "Set up role-based dashboard views"
      ]
    },
    {
      title: "Performance Optimization",
      icon: Zap,
      content: [
        "Optimize API request patterns",
        "Implement caching strategies",
        "Manage rate limits effectively",
        "Monitor system performance",
        "Configure performance alerts",
        "Optimize database queries",
        "Implement best practices",
        "Track performance metrics"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Help Center
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {helpSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <ScrollArea className="h-[250px]">
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-secondary rounded-full" />
                        <span className="text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Need Additional Support?</h2>
          <p className="text-gray-200 mb-6">
            Our dedicated support team is available 24/7 to assist you with any questions or concerns.
            Connect with our community forum to share experiences and get insights from other users.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/documentation">
              <Button variant="default" className="flex items-center gap-2">
                View Documentation <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" className="flex items-center gap-2">
              Join Community Forum <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Help;
