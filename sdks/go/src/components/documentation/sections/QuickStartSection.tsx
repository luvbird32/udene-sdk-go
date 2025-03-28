import React from 'react';
import { CodeBlock } from '../code-block/CodeBlock';

const quickStartCode = `
// Install the SDK
npm install @udene/fraud-detection

// Initialize the client
import { UdeneClient } from '@udene/fraud-detection';

const client = new UdeneClient({
  apiKey: 'your-api-key'
});

// Start detecting fraud
const result = await client.detectFraud({
  transaction: {
    amount: 1000,
    currency: 'USD',
    userId: 'user-123'
  }
});
`;

export const QuickStartSection = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white/60">Quick Start</h2>
      <p className="text-white/60">
        Get started with Udene's fraud detection in minutes. Follow these simple steps to integrate our SDK into your application.
      </p>
      <CodeBlock code={quickStartCode} language="typescript" />
    </div>
  );
};