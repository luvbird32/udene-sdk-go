import React from 'react';
import { CodeBlock } from '../code-block/CodeBlock';

const javascriptCode = `
// JavaScript/TypeScript SDK
import { UdeneClient } from '@udene/sdk';

const client = new UdeneClient({
  apiKey: 'your-api-key'
});

// Make API calls
const result = await client.detectFraud({
  userId: 'user123',
  amount: 100,
  currency: 'USD'
});
`;

const pythonCode = `
# Python SDK
from udene import UdeneClient

client = UdeneClient(api_key='your-api-key')

# Make API calls
result = client.detect_fraud(
    user_id='user123',
    amount=100,
    currency='USD'
)
`;

const kotlinCode = `
// Kotlin SDK
import com.udene.UdeneClient

val client = UdeneClient("your-api-key")

// Make API calls
val result = client.detectFraud(
    userId = "user123",
    amount = 100,
    currency = "USD"
)
`;

export const SDKSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Available SDKs</h3>
        <p className="text-white/60 mb-8">
          Choose from our official SDKs to integrate fraud detection into your application.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="text-lg font-semibold mb-2">JavaScript/TypeScript</h4>
          <CodeBlock code={javascriptCode} language="typescript" />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Python</h4>
          <CodeBlock code={pythonCode} language="python" />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Kotlin</h4>
          <CodeBlock code={kotlinCode} language="kotlin" />
        </div>
      </div>
    </div>
  );
};