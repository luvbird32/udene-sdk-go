import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight, Book, Shield, Zap, Terminal, Code, Users, Bell, LayoutDashboard, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const helpSections = [
    {
      title: "Getting Started",
      icon: Book,
      content: [
        "Create and configure your account with secure credentials and two-factor authentication",
        "Set up your profile and customize notification preferences for optimal service updates",
        "Review and understand our comprehensive security features and best practices",
        "Learn about user roles and their specific permissions within the system",
        "Configure team collaboration settings for multi-user environments",
        "Implement recommended security policies for your organization",
        "Set up default preferences for automated responses and alerts",
        "Understand the dashboard layout and key performance indicators"
      ]
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      content: [
        "Configure advanced fraud detection parameters for transaction monitoring",
        "Set up IP address filtering and geographic access restrictions",
        "Implement real-time security alerts and custom notification rules",
        "Review detailed security logs and comprehensive audit reports",
        "Configure device fingerprinting for enhanced authentication",
        "Set up end-to-end data encryption for sensitive information",
        "Manage session timeout and automatic logout settings",
        "Monitor and manage authorized devices and access points"
      ]
    },
    {
      title: "API Integration",
      icon: Terminal,
      content: [
        "Access our detailed API documentation with endpoint specifications",
        "Generate and manage secure API keys with customizable permissions",
        "Monitor real-time API usage and performance metrics",
        "Test API endpoints in our secure sandbox environment",
        "Implement webhook integrations for real-time event notifications",
        "Analyze API performance and optimize request patterns",
        "Configure rate limiting rules to prevent abuse",
        "Handle API error responses and implement retry strategies"
      ]
    },
    {
      title: "Developer Tools",
      icon: Code,
      content: [
        "Access comprehensive SDK documentation and integration guides",
        "Utilize our testing environment for safe implementation",
        "Learn about our machine learning-based fraud detection algorithms",
        "Debug API integration issues with detailed error logging",
        "Access code samples and real-world implementation examples",
        "Master our CLI tools for efficient system management",
        "Understand our semantic versioning system for updates",
        "Get direct access to developer support channels"
      ]
    },
    {
      title: "Account Management",
      icon: Users,
      content: [
        "Manage team member roles and access permissions effectively",
        "Review and update billing information and subscription plans",
        "Access detailed usage analytics and system reports",
        "Configure organization-wide security settings",
        "Set up Single Sign-On (SSO) for enterprise accounts",
        "Manage API access controls and rate limits",
        "Review detailed account activity and audit logs",
        "Configure backup authentication methods for security"
      ]
    },
    {
      title: "Monitoring & Alerts",
      icon: Bell,
      content: [
        "Set up custom alert rules based on risk thresholds",
        "Configure multiple notification channels including email and SMS",
        "Monitor system health metrics in real-time",
        "Track and investigate suspicious activities promptly",
        "Set up automated responses to security incidents",
        "Define and adjust alert thresholds based on risk levels",
        "Create and manage incident response playbooks",
        "Access historical alert data for pattern analysis"
      ]
    },
    {
      title: "Dashboard Features",
      icon: LayoutDashboard,
      content: [
        "Customize dashboard widgets for relevant metrics display",
        "Configure data visualization preferences and charts",
        "Set up real-time monitoring views for critical metrics",
        "Create custom report templates for regular analysis",
        "Schedule automated reporting for key stakeholders",
        "Configure data export options in multiple formats",
        "Set up role-based dashboard access controls",
        "Implement custom dashboard views per team role"
      ]
    },
    {
      title: "Hosting Guide",
      icon: Globe,
      content: [
        "Purchase a domain name from Namecheap's domain registration service",
        "Set up shared hosting or VPS hosting plan through Namecheap's hosting section",
        "Access cPanel through Namecheap's hosting dashboard to manage your hosting",
        "Upload your built project files to the public_html directory via FTP or File Manager",
        "Configure DNS settings in Namecheap's domain management to point to your hosting",
        "Set up SSL certificate through Namecheap's SSL section for HTTPS",
        "Update any environment variables or configuration files for production",
        "Test your website thoroughly after deployment to ensure everything works"
      ]
    },
    {
      title: "Performance Optimization",
      icon: Zap,
      content: [
        "Optimize API request patterns for better performance",
        "Implement effective caching strategies",
        "Configure and optimize rate limiting settings",
        "Monitor and analyze system performance metrics",
        "Set up performance alerts for resource utilization",
        "Optimize database queries and data access patterns",
        "Implement industry best practices for scaling",
        "Track and analyze performance metrics over time"
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
