
import { Button } from "@/components/ui/button";
import { ChevronRight, Book, Shield, Zap, Terminal, Code, Users, Bell, LayoutDashboard, Computer, Network, Database, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
    },
    {
      title: "Use Cases",
      icon: Computer,
      content: [
        "E-commerce Fraud Prevention: Protect online stores from payment fraud, account takeovers, and promo code abuse",
        "Banking & Financial Services: Secure transactions, detect suspicious patterns, and prevent unauthorized access",
        "Social Media Platforms: Combat fake accounts, prevent spam, and protect user authenticity",
        "SaaS Applications: Secure user accounts, prevent trial abuse, and protect API endpoints",
        "Online Gaming: Prevent cheating, detect bot usage, and secure in-game transactions",
        "Healthcare Platforms: Protect patient data, secure medical records, and prevent unauthorized access",
        "Educational Platforms: Prevent academic fraud, secure student data, and protect online assessments",
        "Real Estate Platforms: Prevent listing fraud, protect user information, and secure transactions"
      ]
    },
    {
      title: "Industry Solutions",
      icon: Network,
      content: [
        "Retail & E-commerce: Advanced fraud detection for online transactions and account protection",
        "Financial Technology: Comprehensive security suite for digital banking and payment processing",
        "Healthcare Technology: HIPAA-compliant security measures for patient data protection",
        "Enterprise Software: Scalable security solutions for large-scale business applications",
        "Digital Entertainment: Real-time protection for streaming platforms and content delivery",
        "Education Technology: Academic integrity protection and student data security",
        "Travel & Hospitality: Booking fraud prevention and secure payment processing",
        "Government Services: High-security implementations for public sector applications"
      ]
    },
    {
      title: "Implementation Examples",
      icon: Database,
      content: [
        "API Integration: Step-by-step guide to implementing our fraud detection API",
        "User Authentication: Examples of secure login implementation with multi-factor authentication",
        "Transaction Monitoring: Real-world examples of transaction fraud detection",
        "Bot Protection: Implementation guides for bot detection and prevention",
        "Risk Scoring: Examples of implementing risk-based authentication",
        "Webhook Integration: Guide to setting up real-time fraud alerts",
        "Custom Rules: Examples of creating custom fraud detection rules",
        "Analytics Integration: Implementation of fraud analytics and reporting"
      ]
    }
  ];

  // Track expanded sections
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Help Center
        </h1>
        
        <div className="space-y-8">
          {helpSections.map((section, index) => {
            const IconComponent = section.icon;
            const isExpanded = expandedSections[section.title] || false;

            return (
              <Collapsible
                key={index}
                open={isExpanded}
                onOpenChange={() => toggleSection(section.title)}
                className="border border-primary/10 rounded-lg p-4 transition-all duration-200 hover:border-primary/20"
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between gap-3 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-8 h-8 text-primary" />
                      <h2 className="text-2xl font-semibold m-0">{section.title}</h2>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4">
                  <div className="pl-11 space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <p className="text-gray-300 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>

        <div className="mt-12 bg-black/20 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Need Additional Support?</h2>
          <p className="text-gray-300 mb-6">
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
        </div>
      </div>
    </div>
  );
};

export default Help;

