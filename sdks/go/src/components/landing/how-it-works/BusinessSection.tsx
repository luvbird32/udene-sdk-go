
import { ArrowRight, User, Shield, Check } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Sign Up & Connect",
    description: "Create your account and integrate Udene with your existing systems in minutes"
  },
  {
    icon: Shield,
    title: "Automatic Protection",
    description: "Our system starts monitoring for suspicious patterns and fraudulent behavior across your platform"
  },
  {
    icon: Check,
    title: "Prevent Losses",
    description: "Stop exploitation and system abuse before they impact your revenue and user experience"
  }
];

export const BusinessSection = () => {
  return (
    <div className="mb-20">
      <h3 className="text-2xl font-semibold text-primary mb-8 text-center">
        For Business Users
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="glass-card p-8 rounded-xl text-center relative border border-primary/20 hover:border-primary/30 transition-all duration-300">
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-6 h-6 text-secondary" />
              </div>
            )}
            <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <step.icon className="w-8 h-8 text-secondary" />
            </div>
            <h4 className="text-xl font-semibold text-primary mb-2">{step.title}</h4>
            <p className="text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
