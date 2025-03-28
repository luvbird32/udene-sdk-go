# Monitoring Components

This directory contains components related to system monitoring and health checks.

## Components

### SystemHealth

A real-time monitoring component that displays the status of core system services:
- API Status
- Database Connection
- Cache Availability

#### Features
- Real-time health status updates (30-second refresh interval)
- Visual status indicators with color coding
- Error handling and loading states
- Integration with Supabase for database health checks

#### Usage
```tsx
import { SystemHealth } from "@/components/client-dashboard/monitoring/SystemHealth";

// Inside your component
<SystemHealth />
```

#### Implementation Details
- Uses TanStack Query for data fetching
- Implements error boundaries for fault tolerance
- Provides visual feedback through status badges
- Includes console logging for debugging

#### States
1. **Healthy**: All systems operational (green)
2. **Error**: System issues detected (red)
3. **Loading**: Initial load or refresh state
4. **Error**: Failed health check with error message

## Best Practices
1. Always wrap with ErrorBoundary component
2. Monitor console logs for health check results
3. Handle all possible states (loading, error, success)
4. Use appropriate error messages for debugging

## Future Enhancements
- Add detailed metrics for each system component
- Implement historical status tracking
- Add custom alert thresholds
- Expand monitoring to additional services

## Related Components
- `ApiCreditsDisplay`: Shows API usage credits
- `FlaggedDevices`: Monitors suspicious devices
- `IPAddressMonitoring`: Tracks IP address patterns