
import { useState } from "react";
import { HelpSection } from "@/components/help/HelpSection";
import { SupportSection } from "@/components/help/SupportSection";
import { helpSections } from "@/components/help/helpSections";

const Help = () => {
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
          {helpSections.map((section, index) => (
            <HelpSection
              key={index}
              title={section.title}
              icon={section.icon}
              content={section.content}
              isExpanded={expandedSections[section.title] || false}
              onToggle={() => toggleSection(section.title)}
            />
          ))}
        </div>

        <SupportSection />
      </div>
    </div>
  );
};

export default Help;
