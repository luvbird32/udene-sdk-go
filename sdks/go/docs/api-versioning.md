# API Versioning Strategy

## Version Format
- API versions follow semantic versioning (MAJOR.MINOR.PATCH)
- Current stable version: v1
- All API endpoints are prefixed with version: `/v1/`

## Version Lifecycle
1. **Development (alpha)**
   - Prefix: `/v{n}-alpha/`
   - Breaking changes allowed
   - No stability guarantees

2. **Beta**
   - Prefix: `/v{n}-beta/`
   - API mostly stable
   - Minor breaking changes possible with notice

3. **Stable**
   - Prefix: `/v{n}/`
   - No breaking changes
   - Backward compatible only

## Version Support
- Two major versions supported simultaneously
- 6-month deprecation notice before EOL
- Security patches for all supported versions

## Migration
- Version-specific migration guides provided
- Automated migration tools when possible
- Breaking changes documented in CHANGELOG.md