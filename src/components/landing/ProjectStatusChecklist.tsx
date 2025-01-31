import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ChecklistItem {
  title: string;
  items: {
    text: string;
    implemented: boolean;
  }[];
}

export const ProjectStatusChecklist = () => {
  const checklistData: ChecklistItem[] = [
    {
      title: "Mobile Responsiveness Issues",
      items: [
        { text: "Layout collisions between icons and text", implemented: true },
        { text: "Other sections responsiveness", implemented: false },
        { text: "Components adapt to different screen sizes", implemented: true },
      ]
    },
    {
      title: "Performance Considerations",
      items: [
        { text: "Image optimization", implemented: false },
        { text: "Lazy loading for components", implemented: false },
        { text: "API call monitoring and caching", implemented: true },
      ]
    },
    {
      title: "Security Concerns",
      items: [
        { text: "Input validation", implemented: true },
        { text: "API rate limiting", implemented: true },
        { text: "Data encryption", implemented: true },
        { text: "Secure authentication flows", implemented: true },
      ]
    },
    {
      title: "Error Handling",
      items: [
        { text: "Error boundaries implementation", implemented: true },
        { text: "API error handling", implemented: true },
        { text: "User-friendly error messages", implemented: true },
      ]
    },
    {
      title: "Accessibility",
      items: [
        { text: "ARIA labels", implemented: false },
        { text: "Color contrast", implemented: true },
        { text: "Keyboard navigation", implemented: false },
        { text: "Screen reader compatibility", implemented: false },
      ]
    },
    {
      title: "Browser Compatibility",
      items: [
        { text: "Cross-browser testing", implemented: false },
        { text: "CSS fallbacks", implemented: true },
        { text: "JavaScript polyfills", implemented: false },
      ]
    },
    {
      title: "State Management",
      items: [
        { text: "Proper data flow", implemented: true },
        { text: "Avoid prop drilling", implemented: true },
        { text: "Loading states handling", implemented: true },
      ]
    },
    {
      title: "Form Validation",
      items: [
        { text: "Comprehensive input validation", implemented: true },
        { text: "Form submission error handling", implemented: true },
        { text: "Clear user feedback", implemented: true },
      ]
    },
    {
      title: "Testing Coverage",
      items: [
        { text: "Unit tests", implemented: false },
        { text: "Integration tests", implemented: false },
        { text: "End-to-end testing", implemented: false },
      ]
    },
    {
      title: "Documentation",
      items: [
        { text: "Component documentation", implemented: true },
        { text: "API documentation", implemented: true },
        { text: "Setup instructions", implemented: true },
      ]
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Project Status Checklist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklistData.map((section, index) => (
          <Card key={index} className="p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center gap-3">
                  {item.implemented ? (
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <span className="text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};