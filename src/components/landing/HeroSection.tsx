import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative z-10 mb-16">
      <div className="glass-card p-8 rounded-lg max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 text-green-400 animate-pulse-slow" tabIndex={0}>
          Next-Gen Fraud Detection
        </h1>
        <p className="text-xl text-green-300/90 mb-6" tabIndex={0}>
          Protect your business with advanced AI-powered fraud detection and real-time monitoring
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/dashboard">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/docs">
            <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-900/20">
              View Documentation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};