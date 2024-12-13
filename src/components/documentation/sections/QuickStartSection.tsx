import { Info } from "lucide-react";
import { CodeBlock } from "../code-block/CodeBlock";

const quickStartCode = `# Set your API key as an environment variable
export FRAUD_API_KEY=your_api_key_here

# Make your first API request
curl -X GET "https://api.example.com/v1/metrics" \\
  -H "Authorization: Bearer $FRAUD_API_KEY"`;

export const QuickStartSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Quick Start Guide</h3>
      <p className="text-muted-foreground">
        Get started with our Fraud Detection API in minutes. First, set up your API key:
      </p>
      
      <CodeBlock code={quickStartCode} />
      
      <div className="mt-6 space-y-4">
        <h4 className="text-lg font-semibold">Technology Stack</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>API Framework: Python (FastAPI)</li>
          <li>Machine Learning: TensorFlow, PyTorch</li>
          <li>Database: Supabase (PostgreSQL)</li>
          <li>Caching: Redis</li>
          <li>Message Queue: Apache Kafka</li>
          <li>Monitoring: Prometheus, Grafana</li>
        </ul>
      </div>
    </div>
  );
};