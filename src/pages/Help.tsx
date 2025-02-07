
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Help = () => {
  const helpSections = [
    {
      title: "Getting Started",
      content: [
        "Welcome to our platform's help center",
        "Create an account to get started",
        "Configure your security settings",
        "Set up two-factor authentication for enhanced security"
      ]
    },
    {
      title: "Common Issues",
      content: [
        "Reset your password",
        "Update account information",
        "Configure notification preferences",
        "Manage API keys and access tokens"
      ]
    },
    {
      title: "Security Features",
      content: [
        "Enable fraud detection monitoring",
        "Set up IP address filtering",
        "Configure security alerts",
        "Review security logs and reports"
      ]
    },
    {
      title: "API Integration",
      content: [
        "Access API documentation",
        "Generate API keys",
        "View API usage statistics",
        "Test API endpoints"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Help Center
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {helpSections.map((section, index) => (
          <Card key={index} className="p-6">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <ScrollArea className="h-[200px]">
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
        ))}
      </div>

      <Card className="mt-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
        <p className="text-gray-200">
          Our support team is available 24/7 to assist you with any questions or concerns.
          Visit our community forum for additional resources and to connect with other users.
        </p>
      </Card>
    </div>
  );
};

export default Help;
