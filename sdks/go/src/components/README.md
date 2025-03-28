# Components Directory Structure

```
components/
├── admin/                  # Admin-specific components
│   ├── dashboard/         # Admin dashboard components
│   └── investigation/     # Admin investigation components
├── client/                # Client-specific components
│   ├── dashboard/        # Client dashboard components
│   ├── analytics/        # Analytics components
│   └── services/         # Service management components
├── shared/                # Shared components used across the app
│   ├── ui/              # UI components (buttons, cards, etc.)
│   └── layout/          # Layout components
└── monitoring/            # Monitoring and analytics components
```

## Component Guidelines

1. Each component should be in its own directory with:
   - Main component file (index.tsx)
   - Types file (types.ts)
   - Styles file (if needed)
   - Tests
   - Sub-components

2. Follow naming conventions:
   - PascalCase for component files
   - camelCase for utility files
   - kebab-case for directories

3. Keep components focused and maintainable:
   - Split large components into smaller ones
   - Use composition over inheritance
   - Extract reusable logic into hooks

4. Documentation:
   - Include JSDoc comments
   - Document props using TypeScript interfaces
   - Add usage examples in comments