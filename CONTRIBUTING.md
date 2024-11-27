# Contributing Guidelines

## Getting Started
1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create feature branch: `git checkout -b feature/name`

## Development Process
1. Write code following style guide
2. Add tests for new features
3. Update documentation
4. Run local tests: `npm test`
5. Commit using conventional commits

## Code Style
- Follow ESLint configuration
- Use TypeScript strictly
- Write JSDoc comments
- Max line length: 100 characters

## Pull Requests
1. Update your branch with main
2. Resolve conflicts if any
3. Ensure all tests pass
4. Request review from maintainers
5. Address review feedback

## Commit Messages
Follow conventional commits:
```
feat: add new fraud detection algorithm
fix: resolve memory leak in WebSocket
docs: update API documentation
test: add integration tests for payments
```

## Testing
- Write unit tests for utilities
- Write integration tests for API
- Maintain 80% code coverage
- Test error scenarios

## Documentation
- Update README.md if needed
- Document new features
- Update API documentation
- Add JSDoc comments

## Code Review
- Review within 2 business days
- Address all comments
- Request re-review after changes
- Merge when approved