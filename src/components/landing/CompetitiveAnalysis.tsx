
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Minus, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export const CompetitiveAnalysis = () => {
  const features = [
    {
      category: "ML & AI Capabilities",
      features: [
        {
          name: "Neural Network-Based Detection",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        },
        {
          name: "Real-time Pattern Analysis",
          udene: true,
          competitor1: true,
          competitor2: false
        },
        {
          name: "Behavioral AI",
          udene: true,
          competitor1: true,
          competitor2: true
        },
        {
          name: "Adaptive Learning System",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        },
        {
          name: "Predictive Analytics",
          udene: true,
          competitor1: false,
          competitor2: true
        }
      ]
    },
    {
      category: "Security Features",
      features: [
        {
          name: "Device Fingerprinting",
          udene: true,
          competitor1: true,
          competitor2: true
        },
        {
          name: "System Exploitation Prevention",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        },
        {
          name: "Cross-Platform Protection",
          udene: true,
          competitor1: false,
          competitor2: true
        },
        {
          name: "Zero-Day Threat Detection",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        },
        {
          name: "Multi-Factor Authentication",
          udene: true,
          competitor1: true,
          competitor2: true
        }
      ]
    },
    {
      category: "Performance & Scalability",
      features: [
        {
          name: "Real-time Processing",
          udene: true,
          competitor1: true,
          competitor2: false
        },
        {
          name: "Unlimited API Calls",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        },
        {
          name: "Global Infrastructure",
          udene: true,
          competitor1: true,
          competitor2: true
        },
        {
          name: "Auto-scaling Capability",
          udene: true,
          competitor1: false,
          competitor2: true
        },
        {
          name: "99.99% Uptime SLA",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        }
      ]
    },
    {
      category: "Integration & Support",
      features: [
        {
          name: "24/7 Enterprise Support",
          udene: true,
          competitor1: true,
          competitor2: false
        },
        {
          name: "Custom API Integration",
          udene: true,
          competitor1: false,
          competitor2: true
        },
        {
          name: "Dedicated Success Manager",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        },
        {
          name: "SDK Support",
          udene: true,
          competitor1: true,
          competitor2: true
        }
      ]
    },
    {
      category: "Compliance & Certification",
      features: [
        {
          name: "SOC 2 Type II",
          udene: true,
          competitor1: true,
          competitor2: true
        },
        {
          name: "GDPR Compliance",
          udene: true,
          competitor1: true,
          competitor2: true
        },
        {
          name: "ISO 27001",
          udene: true,
          competitor1: false,
          competitor2: true
        },
        {
          name: "HIPAA Compliance",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        }
      ]
    },
    {
      category: "Advanced Features",
      features: [
        {
          name: "Romance Scam Detection",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        },
        {
          name: "Trial Abuse Prevention",
          udene: true,
          competitor1: false,
          competitor2: true
        },
        {
          name: "Reward Program Protection",
          udene: true,
          competitor1: true,
          competitor2: false
        },
        {
          name: "BEC Attack Prevention",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        }
      ]
    },
    {
      category: "Analytics & Reporting",
      features: [
        {
          name: "Custom Report Builder",
          udene: true,
          competitor1: false,
          competitor2: true
        },
        {
          name: "Real-time Dashboard",
          udene: true,
          competitor1: true,
          competitor2: true
        },
        {
          name: "Risk Score Analytics",
          udene: true,
          competitor1: true,
          competitor2: false
        },
        {
          name: "ML Model Insights",
          udene: true,
          competitor1: false,
          competitor2: false,
          highlight: true
        }
      ]
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
              Udene
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See how we compare to traditional security solutions and why leading enterprises trust our platform
          </p>
        </div>

        <Card className="overflow-hidden bg-black/40 backdrop-blur-sm border-white/5">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/5">
                  <TableHead className="w-[300px] text-white">Features</TableHead>
                  <TableHead className="text-center text-primary font-bold">
                    Udene Platform
                  </TableHead>
                  <TableHead className="text-center text-gray-400">
                    Legacy Provider
                  </TableHead>
                  <TableHead className="text-center text-gray-400">
                    Traditional Solution
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((category, idx) => (
                  <>
                    <TableRow key={`category-${idx}`} className="bg-black/20">
                      <TableCell 
                        colSpan={4} 
                        className="font-semibold text-white"
                      >
                        {category.category}
                      </TableCell>
                    </TableRow>
                    {category.features.map((feature, featureIdx) => (
                      <TableRow 
                        key={`feature-${idx}-${featureIdx}`}
                        className={feature.highlight ? "bg-primary/5" : ""}
                      >
                        <TableCell className="font-medium text-gray-300">
                          <div className="flex items-center gap-2">
                            {feature.highlight && (
                              <Star className="w-4 h-4 text-primary" />
                            )}
                            {feature.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {feature.udene ? (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          ) : (
                            <Minus className="w-5 h-5 text-gray-500 mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {feature.competitor1 ? (
                            <Check className="w-5 h-5 text-gray-400 mx-auto" />
                          ) : (
                            <Minus className="w-5 h-5 text-gray-500 mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {feature.competitor2 ? (
                            <Check className="w-5 h-5 text-gray-400 mx-auto" />
                          ) : (
                            <Minus className="w-5 h-5 text-gray-500 mx-auto" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </section>
  );
};
