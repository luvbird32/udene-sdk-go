# Components Directory

This directory contains all React components used in the application. Components are organized by feature and functionality.

## Directory Structure

```
components/
├── ui/                # Shared UI components
├── client-dashboard/  # Dashboard-specific components
├── auth/             # Authentication components
├── monitoring/       # Monitoring and analytics components
└── shared/           # Shared business components
```

## Component Guidelines

1. Use TypeScript for all components
2. Include JSDoc documentation
3. Implement proper prop validation
4. Follow the project's naming conventions
5. Keep components focused and maintainable

## Common Patterns

### Component Structure
```typescript
/**
 * @component
 * @example
 * ```tsx
 * <ExampleComponent title="Hello" />
 * ```
 */
interface ExampleProps {
  title: string;
}

export const ExampleComponent = ({ title }: ExampleProps) => {
  return <div>{title}</div>;
};
```

### Error Handling
```typescript
if (error) {
  return <ErrorComponent message={error.message} />;
}
```

### Loading States
```typescript
if (isLoading) {
  return <Skeleton />;
}
```

## Testing

1. Write unit tests for all components
2. Test error and loading states
3. Test user interactions
4. Mock external dependencies

## Adding New Components

1. Create a new directory if it's a feature
2. Add component file with TypeScript
3. Include documentation
4. Add tests
5. Update index exports