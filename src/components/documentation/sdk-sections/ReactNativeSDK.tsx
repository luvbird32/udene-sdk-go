
import { CodeBlock } from "../code-block/CodeBlock";

/**
 * ReactNativeSDK component displays code examples and usage instructions 
 * for implementing the Udene React Native SDK in mobile applications.
 */
export const ReactNativeSDK = () => {
  const rnCode = `// Install the SDK
npm install @udene/react-native-sdk axios

// Initialize in your app
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { FraudProvider, useFraud } from '@udene/react-native-sdk';

// Wrap your app with the provider
export default function App() {
  return (
    // Basic configuration with just the API key
    <FraudProvider apiKey="your_api_key">
      <YourApp />
    </FraudProvider>
  );
}

// Advanced configuration example
export function AdvancedApp() {
  return (
    // Advanced configuration with additional options
    <FraudProvider 
      apiKey="your_api_key"
      baseUrl="https://custom-api.udene.com/v1"
      hybridConfig={{
        enableOfflineMode: true,
        localRiskThreshold: 65,
        modelSyncInterval: 12 * 60 * 60 * 1000, // 12 hours
        enableTelemetry: true
      }}
    >
      <YourApp />
    </FraudProvider>
  );
}

// Use the hook in your components
function YourComponent() {
  const { 
    trackInteraction, 
    getMetrics,
    analyzeTransaction,
    syncModels 
  } = useFraud();

  useEffect(() => {
    // Example: Track user interaction
    trackInteraction({
      action: 'view_product',
      metadata: { productId: '123' }
    });
    
    // Example: Get risk metrics
    getMetrics().then(metrics => {
      console.log('Risk score:', metrics.riskScore);
    });
    
    // Example: Analyze a transaction with the hybrid model
    analyzeTransaction({
      transactionId: 'tx_12345',
      amount: 99.99,
      currency: 'USD',
      paymentMethod: 'credit_card'
    }).then(assessment => {
      console.log('Risk assessment:', assessment);
    });
    
    // Sync local detection models with server
    syncModels();
  }, []);

  return <View>...</View>;
}`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">React Native</h4>
      <CodeBlock code={rnCode} language="javascript" />
    </div>
  );
};
