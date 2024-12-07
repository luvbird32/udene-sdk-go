import { Shield, BookOpen, Computer } from "lucide-react";

export const Features = () => {
  return (
    <section className="relative z-10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-12">
          Advanced Protection Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-lg">
            <Shield className="w-12 h-12 text-green-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-green-300 mb-2 text-center">
              Real-time Protection
            </h3>
            <p className="text-green-300/80 text-center">
              Instant threat detection and automated response system to protect your business 24/7
            </p>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <Computer className="w-12 h-12 text-green-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-green-300 mb-2 text-center">
              AI-Powered Analysis
            </h3>
            <p className="text-green-300/80 text-center">
              Advanced machine learning algorithms for pattern recognition and fraud prevention
            </p>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <BookOpen className="w-12 h-12 text-green-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-green-300 mb-2 text-center">
              Compliance Ready
            </h3>
            <p className="text-green-300/80 text-center">
              Built-in compliance reporting and documentation for major regulatory frameworks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};