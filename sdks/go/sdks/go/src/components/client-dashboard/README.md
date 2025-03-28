# Client Dashboard Components

This directory contains components for the main client dashboard functionality.

## Directory Structure

```
client-dashboard/
├── analytics/        # Analytics and data visualization components
├── security/         # Security monitoring and scanning components
├── services/         # Service management components
├── profile/         # User profile management
├── triggers/        # Event trigger management
├── webhooks/        # Webhook configuration components
└── investigation/   # Investigation and logging components
```

## Key Components

### DashboardContent
Main container component that orchestrates the dashboard layout and features.

### ClientMetrics
Displays key performance metrics and risk indicators.

### ApiCreditsDisplay
Shows API usage credits and limitations.

### RiskOverview
Provides risk analysis and threat detection overview.

### ClientProfile
Manages user profile information and settings.

## Component Guidelines

1. Keep components focused and single-responsibility
2. Use TypeScript for all components
3. Implement proper error boundaries
4. Follow the project's naming conventions
5. Include JSDoc documentation

## State Management

- Use React Query for server state
- Local state with useState/useContext where appropriate
- Proper loading and error states

## Error Handling

```typescript
try {
  // API calls and data processing
} catch (error) {
  console.error('Error in component:', error);
  toast({
    title: "Error",
    description: "Something went wrong. Please try again.",
    variant: "destructive"
  });
}
```

## Testing

1. Write unit tests for all components
2. Test error states and loading states
3. Mock external dependencies
4. Test user interactions

## Adding New Components

1. Create a new file with TypeScript
2. Add proper documentation
3. Implement error handling
4. Add loading states
5. Update index exports