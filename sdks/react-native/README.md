
# Udene React Native SDK

A powerful fraud detection and security monitoring SDK for React Native applications.

## Installation

```bash
npm install @udene/react-native-sdk axios
# or
yarn add @udene/react-native-sdk axios
```

## Quick Start

```jsx
import { FraudProvider, useFraud } from '@udene/react-native-sdk';

// Wrap your app with FraudProvider
export default function App() {
  return (
    <FraudProvider apiKey="your_api_key">
      <YourApp />
    </FraudProvider>
  );
}

// Use the hook in your components
function YourComponent() {
  const { trackInteraction, getMetrics } = useFraud();
  
  useEffect(() => {
    // Track user interaction
    trackInteraction({
      action: 'view_product',
      metadata: { productId: '123' }
    });
    
    // Get risk metrics
    getMetrics().then(metrics => {
      console.log('Risk score:', metrics.riskScore);
    });
  }, []);
  
  return <View>...</View>;
}
```

## Features

- Real-time fraud detection
- User behavior tracking
- Risk metrics analysis
- Device fingerprinting
- Secure API communication

## Development

To build the SDK locally:

```bash
npm install
npm run build
```

Make sure to run `npm run clean` before rebuilding to ensure a fresh build.

## Publishing

Follow these steps to publish the SDK to npm:

1. **Prepare the package**
   ```bash
   # Make sure you're in the sdks/react-native directory
   cd sdks/react-native
   
   # Clean previous builds
   npm run clean
   
   # Install dependencies
   npm install
   
   # Build the package
   npm run build
   ```

2. **Verify the build**
   ```bash
   # Check the dist folder to ensure it contains the compiled files
   ls dist
   ```

3. **Update version (if needed)**
   ```bash
   # Update the version in package.json
   npm version patch # or minor or major
   ```

4. **Login to npm**
   ```bash
   npm login
   ```

5. **Publish the package**
   ```bash
   npm publish
   ```

6. **Verify the publication**
   ```bash
   # Check that your package is available on npm
   npm view @udene/react-native-sdk
   ```

### Publishing Checklist

- [ ] Version number updated in package.json
- [ ] All dependencies properly listed
- [ ] Clean build completed successfully
- [ ] CHANGELOG.md updated with latest changes
- [ ] All tests passing
- [ ] README.md is up to date
- [ ] git tag added for the new version

## Documentation

For full documentation, visit [https://udene.net/docs/sdk/react-native](https://udene.net/docs/sdk/react-native)

## License

MIT
