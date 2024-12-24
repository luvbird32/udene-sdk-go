# Hooks Directory

This directory contains React hooks used throughout the application. These hooks encapsulate reusable stateful logic and side effects.

## Common Hooks

### `useDebounce`
A utility hook for debouncing rapidly changing values.
```typescript
const debouncedValue = useDebounce(value, 500);
```

### `useRomanceScamData`
Fetches and manages romance scam detection data.
```typescript
const { data, isLoading } = useRomanceScamData();
```

### `useRewardProgramData`
Manages reward program data and analytics.
```typescript
const { data, isLoading } = useRewardProgramData();
```

## Best Practices

1. Keep hooks focused and single-purpose
2. Use TypeScript for type safety
3. Include error handling
4. Implement proper cleanup in useEffect
5. Use appropriate caching strategies with React Query

## Adding New Hooks

1. Create a new file with the hook name (e.g., `useCustomHook.ts`)
2. Export the hook as a named export
3. Add TypeScript interfaces for parameters and return values
4. Add JSDoc documentation
5. Include usage examples in comments

## Testing Hooks

1. Use React Testing Library's `renderHook`
2. Test error cases and loading states
3. Verify cleanup functions
4. Mock external dependencies

## Directory Structure

```
hooks/
├── common/             # Shared utility hooks
├── api/               # API-related hooks
├── auth/              # Authentication hooks
├── features/          # Feature-specific hooks
└── README.md         # This documentation
```