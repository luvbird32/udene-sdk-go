import { CodeBlock } from "../code-block/CodeBlock";

const authCode = `Authorization: Bearer your_api_key_here`;

export const AuthenticationSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Authentication</h3>
      <p className="text-white/60">
        All API requests require Bearer token authentication using your API key:
      </p>
      
      <CodeBlock code={authCode} />
      
      <div className="mt-6 space-y-4">
        <h4 className="text-lg font-semibold">Rate Limits</h4>
        <ul className="list-disc pl-6 space-y-2 text-white/60">
          <li>Standard Plan: 100 requests per minute</li>
          <li>Enterprise Plan: 1000 requests per minute</li>
          <li>Burst Limit: 200 requests per 10 seconds</li>
        </ul>
        
        <div className="bg-muted p-4 rounded-md mt-4">
          <h5 className="font-semibold mb-2">Rate Limit Headers</h5>
          <pre className="text-sm text-white/60">
            {`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1614556800`}
          </pre>
        </div>
      </div>
    </div>
  );
};