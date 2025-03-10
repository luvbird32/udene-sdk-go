
import { CodeBlock } from "../code-block/CodeBlock";

/**
 * ReactNativeSDK component displays code examples and usage instructions 
 * for implementing the Udene React Native SDK in mobile applications.
 */
export const ReactNativeSDK = () => {
  // Installation and basic usage code
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

  // Hybrid detection engine architecture explanation
  const hybridEngineCode = `// The refactored Hybrid Detection Engine architecture
// Main coordinator class that orchestrates the modules
import { HybridDetectionEngine } from '@udene/react-native-sdk';

// Core modules of the hybrid detection system
import { 
  DeviceFingerprintService, 
  RiskAssessmentService,
  ModelSyncService 
} from '@udene/react-native-sdk';

// Create and configure the engine
const apiClient = new FraudClient({ apiKey: 'your_api_key' });
const engine = new HybridDetectionEngine(
  apiClient,
  localRiskThreshold = 65,
  modelSyncInterval = 24 * 60 * 60 * 1000 // daily sync
);

// Analyze a transaction using the hybrid approach
const assessment = await engine.analyzeTransaction(
  transaction,
  deviceInfo,
  networkInfo
);

// Manually trigger model synchronization
await engine.syncDetectionModels();`;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">React Native</h4>
      <CodeBlock code={rnCode} language="javascript" />
      
      <h5 className="text-md font-medium mt-6">Hybrid Detection Engine Architecture</h5>
      <p className="text-sm text-muted-foreground mb-2">
        The SDK uses a modular architecture for fraud detection with specialized services:
      </p>
      
      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2 mb-3">
        <li>
          <strong>HybridDetectionEngine</strong>: Coordinates the detection process, combining on-device 
          and cloud-based verification for optimal performance and accuracy.
        </li>
        <li>
          <strong>DeviceFingerprintService</strong>: Collects device-specific information to establish 
          identity and detect suspicious hardware or environment characteristics.
        </li>
        <li>
          <strong>RiskAssessmentService</strong>: Performs real-time analysis of transactions and behaviors,
          applying machine learning models to identify risk patterns.
        </li>
        <li>
          <strong>ModelSyncService</strong>: Keeps on-device detection models up-to-date with the latest 
          fraud patterns while maintaining offline capabilities.
        </li>
      </ul>
      
      <p className="text-sm text-muted-foreground mb-3">
        This modular approach enables fast local risk assessment for low-latency responses,
        falling back to comprehensive server-side analysis for higher-risk activities.
      </p>
      
      <CodeBlock code={hybridEngineCode} language="javascript" />
    </div>
  );
};
