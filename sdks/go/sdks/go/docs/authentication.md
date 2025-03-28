# Authentication Guide

## API Key Authentication
All requests to the Fraud Detection API must include an API key in the Authorization header:

```http
Authorization: Bearer your_api_key_here
```

## Obtaining an API Key
1. Log in to your dashboard
2. Navigate to API Keys section
3. Click "Generate New Key"
4. Copy and securely store your key

## Security Best Practices
- Never expose your API key in client-side code
- Rotate keys periodically
- Use different keys for development and production
- Set up IP whitelisting for additional security