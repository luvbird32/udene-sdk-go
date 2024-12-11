# Webhooks Setup Guide

## Overview
Webhooks allow you to receive real-time notifications when fraud-related events occur.

## Configuration
1. Go to your dashboard
2. Navigate to Webhooks section
3. Add a new webhook URL
4. Select events to subscribe to

## Event Types
- `fraud_detected`: High-confidence fraud detection
- `suspicious_activity`: Potentially suspicious behavior
- `risk_score_change`: Significant changes in risk score
- `transaction_blocked`: Transaction prevented due to risk
- `user_blacklisted`: User added to blacklist
- `device_flagged`: Device marked as suspicious
- `ip_blocked`: IP address blocked
- `location_alert`: Unusual location detected
- `velocity_check_failed`: Transaction velocity limits exceeded
- `pattern_detected`: Suspicious pattern identified

## Handling Webhook Events
```javascript
// Example webhook handler
app.post('/webhook', (req, res) => {
  const event = req.body;
  
  switch(event.type) {
    case 'fraud_detected':
      // Handle fraud detection
      break;
    case 'suspicious_activity':
      // Handle suspicious activity
      break;
    case 'transaction_blocked':
      // Handle blocked transaction
      break;
    // Handle other events...
  }
  
  res.sendStatus(200);
});
```